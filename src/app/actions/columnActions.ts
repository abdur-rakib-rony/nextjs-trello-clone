"use server";
import { connectToDB } from "@/lib/db";
import Column, { IColumn } from "@/models/Column";

interface CreateColumnResult {
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

export async function createColumn(name: string): Promise<CreateColumnResult> {
  try {
    await connectToDB();
    const newColumn = new Column({ name });
    await newColumn.save();
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
