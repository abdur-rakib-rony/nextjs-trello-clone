import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import ProjectForm from "./components/ProjectForm";
import UserProjects from "../projects/components/UserProjects";
import LinksBreadcrumb from "@/components/LinksBreadcrumb";

export default function CreateProject() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="max-auto container py-6">
        <LinksBreadcrumb name="create project" link="/create-project" />
        <h1 className="mb-4 mt-2 text-xl font-semibold">
          Create a new project
        </h1>
        <Card className="md:w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>
              Create your new project in one-click.
            </CardDescription>
          </CardHeader>
          <ProjectForm />
        </Card>

        <Card className="mt-4 border-none shadow-none">
          <CardHeader className="m-0 p-0">
            <CardTitle className="mt-4 text-xl">My Projects</CardTitle>
            <CardDescription>
              Explore your existing projects here
            </CardDescription>
          </CardHeader>
          <CardContent className="mt-4 p-0">
            <UserProjects />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
