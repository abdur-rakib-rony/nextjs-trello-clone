"use server";
import { connectToDB } from "@/lib/db";
import Column, { IColumn } from "@/models/Column";
import { revalidatePath } from "next/cache";

interface ResponseResult {
  status: "success" | "error";
  message: string;
}

export async function getColumns(): Promise<IColumn[]> {
  try {
    await connectToDB();
    const columns: IColumn[] = await Column.find().exec();

    const columnsPlain = columns.map((item) => ({
      ...item.toObject(),
      _id: item._id.toString(),
    }));

    return columnsPlain;
  } catch (error) {
    console.error("Error fetching columns:", error);
    throw error;
  }
}

export async function createColumn(name: string): Promise<ResponseResult> {
  try {
    await connectToDB();
    const columnCount = await Column.countDocuments();

    if (columnCount >= 4) {
      return {
        status: "error",
        message: "Maximum of 5 columns reached",
      };
    }

    const newColumn = new Column({ name: name.toLowerCase() });
    await newColumn.save();
    revalidatePath("/dashboard");
    return {
      status: "success",
      message: "Column created successfully",
    };
  } catch (error) {
    console.error("Error creating column:", error);
    return {
      status: "error",
      message: "Failed to create column",
    };
  }
}

export async function removeColumn(columnId: string): Promise<ResponseResult> {
  try {
    await connectToDB();

    const deletedColumn = await Column.findByIdAndDelete(columnId);

    if (!deletedColumn) {
      return {
        status: "error",
        message: "Column not found",
      };
    }

    revalidatePath("/dashboard");

    return {
      status: "success",
      message: "Column removed successfully",
    };
  } catch (error) {
    console.error("Error removing column:", error);
    return {
      status: "error",
      message: "Failed to remove column",
    };
  }
}
