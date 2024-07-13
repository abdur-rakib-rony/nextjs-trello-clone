import { getUserProjects } from "@/app/actions/projectActions";
import { IProject } from "@/models/Project";
import ProjectCard from "./ProjectCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const UserProjects = async () => {
  const allprojects = await getUserProjects();

  if (allprojects?.length === 0) return null;

  return (
    <Card className="mt-4 border-none shadow-none">
      <CardHeader className="m-0 p-0">
        <CardTitle className="mt-4 text-xl">My Projects</CardTitle>
        <CardDescription>Explore your existing projects here</CardDescription>
      </CardHeader>
      <CardContent className="mt-4 p-0">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {allprojects?.map((project: IProject) => (
            <ProjectCard key={project._id.toString()} project={project} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserProjects;
