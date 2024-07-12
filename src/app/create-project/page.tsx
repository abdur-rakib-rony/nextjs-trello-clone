import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProjectForm from "./components/ProjectForm";
import UserProjects from "../projects/components/UserProjects";

export default function CreateProject() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-auto container">
        <h1 className="mb-4 text-xl font-bold">Create a new project</h1>
        <Card className="md:w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Deploy your new project in one-click.
            </CardDescription>
          </CardHeader>
          <ProjectForm />
        </Card>

        <Card className="mt-4">
          <CardHeader>
            <CardTitle>My Projects</CardTitle>
            <CardDescription>
              Explore your existing projects here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserProjects />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
