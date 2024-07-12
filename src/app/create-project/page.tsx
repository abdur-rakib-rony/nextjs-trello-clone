"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { createProject } from "@/app/actions/projectActions";
import { getAllUsers } from "@/app/actions/userActions";
import { IUser } from "@/models/User";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  members: z.array(z.string()).default([]),
});

type FormValues = z.infer<typeof formSchema>;

export default function CreateProject() {
  const { toast } = useToast();
  const [users, setUsers] = useState<IUser[]>([]);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      members: [],
    },
  });

  useEffect(() => {
    async function fetchUsers() {
      try {
        const allUsers = await getAllUsers();
        setUsers(allUsers);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        toast({
          title: "Error",
          description: "Failed to fetch users",
          variant: "destructive",
        });
      }
    }

    fetchUsers();
  }, [toast]);

  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await createProject(values);
      if (result.status === "success") {
        toast({
          title: "Success",
          description: result.message,
        });
        form.reset();
        router.push("/projects");
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>
            Deploy your new project in one-click.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Name of your project" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="members"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select members</FormLabel>
                      <Select
                        onValueChange={(value) =>
                          field.onChange([...field.value, value])
                        }
                        value={field.value[0] || ""}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          {users.map((user) => (
                            <SelectItem
                              key={user._id.toString()}
                              value={user._id.toString()}
                            >
                              {`${user.first_name} ${user.last_name}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Create
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}
