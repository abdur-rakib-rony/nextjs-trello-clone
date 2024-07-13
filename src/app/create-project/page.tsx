import { FC } from "react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ProjectForm from "./components/ProjectForm";
import UserProjects from "../projects/components/UserProjects";
import LinksBreadcrumb from "@/components/LinksBreadcrumb";

const CreateProject: FC = () => {
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
        <UserProjects />
      </div>
    </div>
  );
};

export default CreateProject;
