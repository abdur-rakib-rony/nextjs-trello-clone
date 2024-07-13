"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserPlus } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { addMemberToProject } from "@/app/actions/projectActions";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { IUser } from "@/models/User";

interface AddMembersProps {
  projectId: string;
  allUsers: IUser[];
}

const memberSchema = z.object({
  memberId: z.string().nonempty("Member selection is required"),
});

type FormValues = z.infer<typeof memberSchema>;

const AddMembers: React.FC<AddMembersProps> = ({ projectId, allUsers }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      memberId: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    try {
      const result = await addMemberToProject(projectId, values.memberId);
      if (result.status === "success") {
        toast({
          title: "Success",
          description: result.message,
        });
        form.reset();
        setIsOpen(false);
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-blue-400 text-white hover:bg-blue-500 hover:text-white"
        >
          <UserPlus size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Member</DialogTitle>
          <DialogDescription>Add member to the project</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form.control}
                  name="memberId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select member</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a member" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent position="popper">
                          {allUsers.map((user: IUser) => (
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
                Add Member
              </Button>
            </CardFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMembers;
