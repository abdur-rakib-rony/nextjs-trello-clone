import LinksBreadcrumb from "@/components/LinksBreadcrumb";
import UserProjects from "./components/UserProjects";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectForm from "../create-project/components/ProjectForm";

const Projects = async () => {
  return (
    <div className="container mx-auto py-6">
      <LinksBreadcrumb name="dashboard" link="/projects" />
      <div>
        <h1 className="mb-4 mt-2 text-xl font-semibold">My Projects</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" className="mb-4">Create Project</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create project</DialogTitle>
              <DialogDescription>
                Create your new project in one-click.
              </DialogDescription>
            </DialogHeader>
            <ProjectForm />
          </DialogContent>
        </Dialog>
      </div>
      <UserProjects />
    </div>
  );
};

export default Projects;
