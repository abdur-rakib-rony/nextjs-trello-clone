"use server";
import { connectToDB } from "@/lib/db";
import Task, { ITask } from "@/models/Task";
import { Types } from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import User from "@/models/User";

type CreateTaskInput = {
  name: string;
  projectName?: string;
  summary?: string;
  description?: string;
  assigneeName?: string;
  reporterName?: string;
  labels?: string[];
  priority?: "Low" | "Medium" | "High" | "Urgent";
  teamName?: string;
};

type UpdateTaskInput = Partial<{
  name: string;
  projectName: string;
  summary: string;
  description: string;
  assigneeName: string;
  labels: string[];
  priority: "Low" | "Medium" | "High" | "Urgent";
  teamName: string;
  status: "string";
  newComment: string;
}>;

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("You must be logged in to perform this action.");
  }
  return session.user;
}

export async function createTask(
  taskInput: CreateTaskInput,
): Promise<{ success: boolean; message: string; taskId?: string }> {
  try {
    await connectToDB();

    const user = await getCurrentUser();
    if (!user || !user.email) {
      throw new Error("User not authenticated");
    }

    const getUser = await User.findOne(
      { email: user.email },
      "-password",
    ).exec();

    if (!getUser) {
      throw new Error("User not found in database");
    }

    const newTask = new Task({ ...taskInput, status: "todo" });

    newTask.activities = [
      {
        action: "Task created",
        timestamp: new Date(),
        user: new Types.ObjectId(user.id),
      },
    ];

    if (!newTask.reporterName && getUser.email) {
      newTask.reporterName = `${getUser.first_name} ${getUser.last_name}`;
    }

    const savedTask = await newTask.save();
    revalidatePath("/dashboard");

    return {
      success: true,
      message: `Task "${taskInput.name}" created successfully.`,
      taskId: savedTask._id.toString(),
    };
  } catch (error) {
    console.error("Error creating task:", error);
    return {
      success: false,
      message: `Failed to create task: ${(error as Error).message}`,
    };
  }
}

export async function getTasksByProject({
  projectName,
}: {
  projectName: string;
}): Promise<ITask[]> {
  try {
    await connectToDB();
    const tasks = await Task.find({ projectName })
      .sort({ createdAt: -1 })
      .exec();

    const tasksPlain = tasks.map((task) => {
      const taskObj = task.toObject();
      return {
        ...taskObj,
        _id: taskObj._id.toString(),
        user: taskObj.user ? taskObj.user.toString() : undefined,
        activities: taskObj.activities?.map((activity: any) => ({
          ...activity,
          _id: activity._id.toString(),
          user: activity.user.toString(),
        })),
        comments: taskObj.comments?.map((comment: any) => ({
          ...comment,
          _id: comment._id.toString(),
          user: comment.user.toString(),
        })),
      };
    });

    return tasksPlain;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}

export async function updateTask(
  taskId: string,
  updates: UpdateTaskInput,
): Promise<{ success: boolean; message: string; task?: ITask }> {
  try {
    await connectToDB();
    const user = await getCurrentUser();
    if (!user || !user.email) {
      throw new Error("User not authenticated");
    }

    const getUser = await User.findOne(
      { email: user.email },
      "-password",
    ).exec();

    if (!getUser) {
      throw new Error("User not found in database");
    }

    const task = await Task.findById(taskId);
    if (!task) {
      return { success: false, message: "Task not found." };
    }

    const activities: {
      action: string;
      timestamp: Date;
      user: Types.ObjectId;
    }[] = [];

    Object.entries(updates).forEach(([key, value]) => {
      if (key === "newComment") {
        return;
      }
      if (value !== undefined && key in task) {
        (task as any)[key] = value;
        activities.push({
          action: `${key} updated to ${value}`,
          timestamp: new Date(),
          user: new Types.ObjectId(user.id),
        });
      }
    });

    if (updates.assigneeName) {
      task.reporterName = `${getUser.first_name} ${getUser.last_name}`;
      activities.push({
        action: `Task assigned to ${updates.assigneeName}`,
        timestamp: new Date(),
        user: new Types.ObjectId(user.id),
      });
    }

    if (updates.newComment) {
      task.comments.push({
        text: updates.newComment,
        user: new Types.ObjectId(user.id),
        timestamp: new Date(),
      });
      activities.push({
        action: "New comment added",
        timestamp: new Date(),
        user: new Types.ObjectId(user.id),
      });
    }

    task.activities.push(...activities);

    await task.save();

    revalidatePath("/dashboard");

    return {
      success: true,
      message: "Task updated successfully.",
      task: task.toObject(),
    };
  } catch (error) {
    console.error("Error updating task:", error);
    return {
      success: false,
      message: `Failed to update task: ${(error as Error).message}`,
    };
  }
}

export async function getAllTasks(): Promise<ITask[]> {
  try {
    await connectToDB();
    const tasks = await Task.find({}).sort({ createdAt: -1 }).exec();

    const tasksPlain = tasks.map((task) => {
      const taskObj = task.toObject();
      return {
        ...taskObj,
        _id: taskObj._id.toString(),
        user: taskObj.user ? taskObj.user.toString() : undefined,
        activities: taskObj.activities?.map((activity: any) => ({
          ...activity,
          _id: activity._id.toString(),
          user: activity.user.toString(),
        })),
        comments: taskObj.comments?.map((comment: any) => ({
          ...comment,
          _id: comment._id.toString(),
          user: comment.user.toString(),
        })),
      };
    });

    return tasksPlain;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
}
