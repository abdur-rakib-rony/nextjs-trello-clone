"use client";
import { FC, useEffect, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
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
import { projectFormSchema } from "@/schemas/zod";
import { Loader2 } from "lucide-react";

type FormValues = z.infer<typeof projectFormSchema>;

const ProjectForm: FC = () => {
  const { toast } = useToast();
  const [users, setUsers] = useState<IUser[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(projectFormSchema),
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
      }
    }

    fetchUsers();
  }, [toast]);

  const router = useRouter();

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    try {
      const result = await createProject(values);
      if (result.status === "success") {
        toast({
          title: "Success",
          description: result.message,
        });
        form.reset();
        router.push(`/dashboard/${result.id}`);
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
    } finally {
      setIsLoading(false);
    }
  };
  return (
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
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              "Create Project"
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
};

export default ProjectForm;
