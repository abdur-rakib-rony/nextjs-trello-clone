"use server";
import { connectToDB } from "@/lib/db";
import Project, { IProject } from "@/models/Project";
import { IUser } from "@/models/User";
import { Types } from "mongoose";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

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
    const userId = new ObjectId(user._id);

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
    const userId = new ObjectId(user._id);

    const projects: IProject[] = await Project.find({ members: userId })
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
    console.error("Error fetching user projects:", error);
    throw error;
  }
}

export async function getProjectById(
  projectId: string,
): Promise<IProject | null> {
  try {
    await connectToDB();

    if (!ObjectId.isValid(projectId)) {
      throw new Error("Invalid project ID format.");
    }

    const project: IProject | null = await Project.findById(projectId)
      .populate("members")
      .exec();

    if (!project) {
      return null;
    }

    const projectPlain = {
      ...project.toObject(),
      _id: project._id.toString(),
      members:
        (project.members as IUser[])?.map((member) => ({
          ...member.toObject(),
          _id: member._id.toString(),
        })) || [],
    };

    return projectPlain;
  } catch (error) {
    console.error("Error fetching project:", error);
    throw error;
  }
}

export async function removeMemberFromProject(
  projectId: string,
  memberId: string,
): Promise<CreateProjectResult> {
  try {
    await connectToDB();

    const user = await getCurrentUser();
    const userId = new ObjectId(user._id);

    if (!ObjectId.isValid(projectId) || !ObjectId.isValid(memberId)) {
      return {
        status: "error",
        message: "Invalid project ID or member ID format.",
      };
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return {
        status: "error",
        message: "Project not found.",
      };
    }

    if (
      !project.members.some(
        (member: string) => member.toString() === userId.toString(),
      )
    ) {
      return {
        status: "error",
        message:
          "You don't have permission to remove members from this project.",
      };
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $pull: { members: memberId } },
      { new: true },
    );

    if (!updatedProject) {
      return {
        status: "error",
        message: "Failed to update project.",
      };
    }

    revalidatePath("/projects");

    return {
      status: "success",
      message: "Member removed from project successfully.",
    };
  } catch (error) {
    console.error("Error removing member from project:", error);
    return {
      status: "error",
      message: "An unexpected error occurred.",
    };
  }
}

export async function addMemberToProject(
  projectId: string,
  memberId: string,
): Promise<CreateProjectResult> {
  try {
    await connectToDB();

    const user = await getCurrentUser();
    const userId = new ObjectId(user._id);

    if (!ObjectId.isValid(projectId) || !ObjectId.isValid(memberId)) {
      return {
        status: "error",
        message: "Invalid project ID or member ID format.",
      };
    }

    const project = await Project.findById(projectId);

    if (!project) {
      return {
        status: "error",
        message: "Project not found.",
      };
    }

    if (!project.members.some(
      (member: string) => member.toString() === userId.toString(),
    )) {
      return {
        status: "error",
        message: "You don't have permission to add members to this project.",
      };
    }

    if (project.members.some(
      (member: string) => member.toString() === memberId,
    )) {
      return {
        status: "error",
        message: "This member is already in the project.",
      };
    }

    const updatedProject = await Project.findByIdAndUpdate(
      projectId,
      { $addToSet: { members: memberId } },
      { new: true },
    );

    if (!updatedProject) {
      return {
        status: "error",
        message: "Failed to update project.",
      };
    }

    revalidatePath("/projects");

    return {
      status: "success",
      message: "Member added to project successfully.",
    };
  } catch (error) {
    console.error("Error adding member to project:", error);
    return {
      status: "error",
      message: "An unexpected error occurred.",
    };
  }
}