import { getProjectById } from "@/app/actions/projectActions";
import LinksBreadcrumb from "@/components/LinksBreadcrumb";
import ProjectUsers from "@/components/ProjectUsers";
import { IProject } from "@/models/Project";
import React from "react";
import CreateButton from "./components/column/CreateButton";
import CreateTask from "./components/kanban/CreateTask";
import Tasks from "./components/kanban/Tasks";
import { getAllUsers } from "@/app/actions/userActions";

interface ProjectParams {
  id: string;
}

const Project = async ({ params }: { params: ProjectParams }) => {
  const { id } = params;
  const allUsers = await getAllUsers();
  const project: IProject | null = await getProjectById(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <div>
        <LinksBreadcrumb name={project.name} link={`/dashboard/${id}`} />
        <h1 className="mt-4 text-base font-semibold">{project.name}</h1>
      </div>
      <div className="flex items-center gap-4">
        <ProjectUsers users={project.members} project={project} allUsers={allUsers}/>
        <CreateButton />
        <CreateTask projectName={project.name} />
      </div>
      <Tasks />
    </div>
  );
};

export default Project;
