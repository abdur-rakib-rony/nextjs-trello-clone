import { getProjectById } from "@/app/actions/projectActions";
import LinksBreadcrumb from "@/components/LinksBreadcrumb";
import ProjectUsers from "@/components/ProjectUsers";
import { IProject } from "@/models/Project";
import React from "react";
import CreateButton from "./components/column/CreateButton";
import CreateTask from "./components/kanban/CreateTask";
import Tasks from "./components/kanban/Tasks";
import { getAllUsers } from "@/app/actions/userActions";
import { IUser } from "@/models/User";

interface ProjectParams {
  id: string;
}

const Project = async ({ params }: { params: ProjectParams }) => {
  const { id } = params;
  const allUsers: IUser[] = await getAllUsers();
  const project: IProject | null = await getProjectById(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div className="py-6">
      <LinksBreadcrumb name={project.name} link={`/dashboard/${id}`} />
      <h1 className="mb-4 mt-2 text-xl font-semibold">{project.name}</h1>
      <div className="flex items-center gap-4">
        <ProjectUsers
          users={project.members as IUser[]}
          project={project}
          allUsers={allUsers}
        />
        <CreateButton />
        <CreateTask projectName={project.name} />
      </div>
      <Tasks projectName={project.name} />
    </div>
  );
};

export default Project;
