"use client";

import React, { useState, useEffect } from "react";
import { IProject } from "@/models/Project";
import { IUser } from "@/models/User";
import moment from "moment";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
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
import { X } from "lucide-react";

interface ProjectCardProps {
  project: IProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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

  const handleDelete = async () => {
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
    <Card className="md:w-[350px]">
      <div className="flex items-center justify-end">
        <Button onClick={handleDelete} variant="outline" size="icon">
          <X color="red" />
        </Button>
      </div>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
        <CardDescription>
          Created {moment(project.createdAt).format("MMMM DD, YYYY")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <h3 className="mb-2 font-semibold">Members:</h3>
        <MemberList
          members={project.members as IUser[]}
          onRemoveMember={handleRemoveMember}
        />
        <div className="mt-4">
          <MemberSelect
            users={users}
            selectedMember={selectedMember}
            onSelectMember={setSelectedMember}
          />
          <div className="mt-4 flex items-center justify-between gap-4">
            <Button disabled={!selectedMember} onClick={handleAddMember}>
              Add Member
            </Button>
            <Link href={`/projects/${project._id.toString()}`}>
              <Button variant="ghost">View Project</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
