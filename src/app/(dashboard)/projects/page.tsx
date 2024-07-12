import React from "react";
import { getUserProjects } from "@/app/actions/projectActions";
import { IProject } from "@/models/Project";
import ProjectCard from "./components/ProjectCard";

const Projects = async () => {
  const allprojects = await getUserProjects();

  return (
    <div className="min-h-screen p-6">
      <h1 className="mb-6 text-xl font-semibold">My Projects</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allprojects?.map((project: IProject) => (
          <ProjectCard key={project._id.toString()} project={project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;