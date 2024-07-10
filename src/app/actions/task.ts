"use server";
import { connectToDB } from '@/lib/db';
import Task, { ITask } from '@/models/Task';

export async function tasks(): Promise<any[]> {
  try {
    await connectToDB();
    const tasks: ITask[] = await Task.find().exec();

    const tasksPlain = tasks.map((task) => ({
      ...task.toObject(),
      _id: task._id.toString(),
      activities: task.activities?.map((activity) => ({
        ...activity,
        user: activity.user.toString(),
        timestamp: activity.timestamp.toISOString(),
      })) || [],
      comments: task.comments?.map((comment) => ({
        ...comment,
        user: comment.user.toString(),
        timestamp: comment.timestamp.toISOString(),
      })) || [],
    }));

    return tasksPlain;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}