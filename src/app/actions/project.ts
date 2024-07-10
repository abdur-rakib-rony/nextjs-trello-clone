"use server";
import { connectToDB } from '@/lib/db';
import Project, { IProject } from '@/models/Project';
import { IUser } from '@/models/User';

export async function projects(): Promise<any[]> {
  try {
    await connectToDB();
    const projects: IProject[] = await Project.find().populate('members').exec();

    const projectsPlain = projects.map((project) => ({
      ...project.toObject(),
      _id: project._id.toString(),
      members: (project.members as IUser[])?.map((member) => ({
        ...member.toObject(),
        _id: member._id.toString(),
      })) || [],
    }));

    return projectsPlain;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
}