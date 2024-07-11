"use server";

import { connectToDB } from '@/lib/db';
import Task, { ITask } from '@/models/Task';
import { Types } from 'mongoose';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

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
  status: "pending" | "progress" | "completed";
  newComment: string;
}>;

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("You must be logged in to perform this action.");
  }
  return session.user;
}

export async function createTask(taskInput: CreateTaskInput): Promise<{ success: boolean; message: string; taskId?: string }> {
  try {
    await connectToDB();

    const user = await getCurrentUser();

    const newTask = new Task(taskInput);

    // Add creation activity with the current user's ID
    newTask.activities = [{
      action: 'Task created',
      timestamp: new Date(),
      user: new Types.ObjectId(user.id),
    }];

    // Set the reporter name to the current user's name if not provided
    if (!newTask.reporterName && user.name) {
      newTask.reporterName = user.name;
    }

    const savedTask = await newTask.save();

    return {
      success: true,
      message: `Task "${taskInput.name}" created successfully.`,
      taskId: savedTask._id.toString(),
    };
  } catch (error) {
    console.error('Error creating task:', error);
    return {
      success: false,
      message: `Failed to create task: ${(error as Error).message}`,
    };
  }
}

export async function updateTask(taskId: string, updates: UpdateTaskInput): Promise<{ success: boolean; message: string; task?: ITask }> {
  try {
    await connectToDB();
    const user = await getCurrentUser();

    const task = await Task.findById(taskId);
    if (!task) {
      return { success: false, message: "Task not found." };
    }

    const activities: { action: string; timestamp: Date; user: Types.ObjectId }[] = [];

    // Update task fields
    Object.entries(updates).forEach(([key, value]) => {
      if (key === 'newComment') {
        // Handle new comment separately
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

    // Handle assignment separately to set reporter
    if (updates.assigneeName) {
      task.reporterName = user.name;
      activities.push({
        action: `Task assigned to ${updates.assigneeName}`,
        timestamp: new Date(),
        user: new Types.ObjectId(user.id),
      });
    }

    // Add new comment if provided
    if (updates.newComment) {
      task.comments.push({
        text: updates.newComment,
        user: new Types.ObjectId(user.id),
        timestamp: new Date(),
      });
      activities.push({
        action: 'New comment added',
        timestamp: new Date(),
        user: new Types.ObjectId(user.id),
      });
    }

    // Add all activities
    task.activities.push(...activities);

    await task.save();

    return { 
      success: true, 
      message: "Task updated successfully.",
      task: task.toObject(),
    };
  } catch (error) {
    console.error('Error updating task:', error);
    return { success: false, message: `Failed to update task: ${(error as Error).message}` };
  }
}


// Get all tasks
// const tasks = await getTasks();

// Create a new task
// const createResult = await createTask({
//   name: "New Task",
//   projectName: "Project X",
//   summary: "This is a new task",
//   priority: "High",
// });

// Update a task
// const updateResult = await updateTask("taskId", {
//   name: "Updated Task Name",
//   assigneeName: "John Doe",
//   priority: "Urgent",
//   status: "progress",
//   newComment: "This task has been updated and is now urgent.",
// });