"use client";
import { useState, useEffect, FC } from "react";
import { IProject } from "@/models/Project";
import { IUser } from "@/models/User";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  addMemberToProject,
  deleteProject,
  removeMemberFromProject,
} from "@/app/actions/projectActions";
import { getAllUsers } from "@/app/actions/userActions";
import MemberList from "./MemberList";
import MemberSelect from "./MemberSelect";
import Link from "next/link";
import { Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const { toast } = useToast();
  const [users, setUsers] = useState<IUser[]>([]);
  const [selectedMember, setSelectedMember] = useState<string>("");

  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    }
    fetchUsers();
  }, []);

  const handleRemoveMember = async (memberId: string) => {
    try {
      const result = await removeMemberFromProject(
        project._id.toString(),
        memberId,
      );
      if (result.status === "success") {
        toast({
          title: "Success",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to remove member:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while removing the member.",
        variant: "destructive",
      });
    }
  };

  const handleAddMember = async () => {
    if (!selectedMember) return;

    try {
      const result = await addMemberToProject(
        project._id.toString(),
        selectedMember,
      );
      if (result.status === "success") {
        toast({
          title: "Success",
          description: result.message,
          variant: "default",
        });
        setSelectedMember("");
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to add member:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while adding the member.",
        variant: "destructive",
      });
    }
  };

  const handleProjectDelete = async () => {
    try {
      const result = await deleteProject(project._id.toString());
      if (result.status === "success") {
        toast({
          title: "Success",
          description: result.message,
          variant: "default",
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Failed to delete project:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while delete project.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-sm shadow-lg transition-shadow duration-300 hover:shadow-xl md:max-w-md lg:max-w-lg xl:max-w-xl">
      <div className="flex items-center justify-between rounded-t-lg border-b bg-gray-50 p-4">
        <CardTitle className="text-xl font-semibold text-gray-800">
          {project.name}
        </CardTitle>
        <Button
          onClick={handleProjectDelete}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full hover:bg-red-100"
        >
          <Trash
            size={16}
            className="text-gray-500 transition-colors hover:text-red-500"
          />
        </Button>
      </div>
      <CardContent className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <CardDescription className="text-sm text-gray-500">
            Created {moment(project.createdAt).format("MMMM DD, YYYY")}
          </CardDescription>
          <Badge variant="secondary" className="text-xs">
            {project.members ? project.members.length : 0} Members
          </Badge>
        </div>
        <div className="space-y-4">
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700">
              Team Members:
            </h3>
            <MemberList
              members={project.members as IUser[]}
              onRemoveMember={handleRemoveMember}
            />
          </div>
          <Separator />
          <div>
            <h3 className="mb-2 text-sm font-semibold text-gray-700">
              Add New Member:
            </h3>
            <MemberSelect
              users={users}
              selectedMember={selectedMember}
              onSelectMember={setSelectedMember}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center justify-between gap-4 rounded-b-lg bg-gray-50 p-6 sm:flex-row">
        <Button
          disabled={!selectedMember}
          onClick={handleAddMember}
          className="w-full sm:w-auto"
        >
          Add Member
        </Button>
        <Link
          href={`/dashboard/${project._id.toString()}`}
          className="w-full sm:w-auto"
        >
          <Button variant="outline" className="w-full">
            View Project
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
