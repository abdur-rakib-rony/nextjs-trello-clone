import { getProjectById } from "@/app/actions/projectActions";
import { IProject } from "@/models/Project";
import React from "react";

interface ProjectParams {
  id: string;
}

const Project = async ({ params }: { params: ProjectParams }) => {
  const { id } = params;
  const project: IProject | null = await getProjectById(id);

  if (!project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
    </div>
  );
};

export default Project;