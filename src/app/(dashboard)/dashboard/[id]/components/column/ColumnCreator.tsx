"use client";
import { createColumn } from "@/app/actions/columnActions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { columnFormSchema } from "@/schemas/zod";

const ColumnCreator: React.FC = () => {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof columnFormSchema>>({
    resolver: zodResolver(columnFormSchema),
    defaultValues: {
      columnName: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof columnFormSchema>) => {
    try {
      const result = await createColumn(values.columnName);
      if (result.status === "success") {
        form.reset();
        toast({
          title: "Success",
          description: "Column created successfully",
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error creating column:", error);
      toast({
        title: "Error",
        description: "Failed to create column",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-4 space-y-4">
        <FormField
          control={form.control}
          name="columnName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Column Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter column name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create Column</Button>
      </form>
    </Form>
  );
};

export default ColumnCreator;
