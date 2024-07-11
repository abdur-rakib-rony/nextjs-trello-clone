"use server";
import { connectToDB } from "@/lib/db";
import Project, { IProject } from "@/models/Project";
import { IUser } from "@/models/User";
import { Types } from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";

interface CreateProjectInput {
  name: string;
  members?: string[];
}

interface CreateProjectResult {
  status: "success" | "error";
  message: string;
}

async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    throw new Error("You must be logged in to perform this action.");
  }
  return session.user;
}

export async function createProject(
  input: CreateProjectInput,
): Promise<CreateProjectResult> {
  try {
    await connectToDB();

    const user = await getCurrentUser();
    const userId = new ObjectId(user.id);

    const { name, members } = input;

     const existingProject = await Project.findOne({ name });
     if (existingProject) {
       return {
         status: "error",
         message: "A project with this name already exists.",
       };
     }

    const projectData: { name: string; members?: Types.ObjectId[] } = { name };

    if (members && members.length > 0) {
      projectData.members = members.map((id) => new Types.ObjectId(id));
    }

    const newProject = new Project({
      name,
      members: [userId],
    });
    await newProject.save();

    return {
      status: "success",
      message: "Project created successfully",
    };
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
}

export async function projects(): Promise<IProject[]> {
  try {
    await connectToDB();
    const projects: IProject[] = await Project.find()
      .populate("members")
      .exec();

    const projectsPlain = projects.map((project) => ({
      ...project.toObject(),
      _id: project._id.toString(),
      members:
        (project.members as IUser[])?.map((member) => ({
          ...member.toObject(),
          _id: member._id.toString(),
        })) || [],
    }));

    return projectsPlain;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
}

export async function getUserProjects(): Promise<IProject[]> {
  try {
    await connectToDB();

    const user = await getCurrentUser();
    const userId = new ObjectId(user.id);

    const projects: IProject[] = await Project.find({ members: userId })
      .populate("members")
      .exec();

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
    console.error("Error fetching user projects:", error);
    throw error;
  }
}