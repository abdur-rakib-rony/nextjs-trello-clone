import { getUserProjects } from "@/app/actions/projectActions";
import { IProject } from "@/models/Project";
import ProjectCard from "./ProjectCard";

const UserProjects = async () => {
  const allprojects = await getUserProjects();
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {allprojects?.map((project: IProject) => (
        <ProjectCard key={project._id.toString()} project={project} />
      ))}
    </div>
  );
};

export default UserProjects;
