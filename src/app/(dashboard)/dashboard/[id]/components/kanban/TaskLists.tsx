"use client";

import React from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { DraggableTask } from "./DraggableTask";
import { updateTask } from "@/app/actions/taskActions";
import { ITask } from "@/models/Task";
import { Ellipsis, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { removeColumn } from "@/app/actions/columnActions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Column {
  _id: string;
  name: string;
}

interface TaskListsProps {
  alltasks: ITask[];
  columns: any[];
}

export function TaskLists({ alltasks, columns }: TaskListsProps) {
  const { toast } = useToast();

  const onDragEnd = async (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newStatus = destination.droppableId as "string";
    await updateTask(draggableId, {
      status: newStatus,
    });
  };

  const handleRemoveColumn = async (columnId: string) => {
    try {
      const result = await removeColumn(columnId);
      if (result.status === "success") {
        toast({
          title: "Success",
          description: result.message,
        });
      } else {
        toast({
          title: "Error",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error removing column:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while removing the column.",
        variant: "destructive",
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        <Droppable droppableId="todo">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-1/2 rounded bg-gray-100 p-4"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="rounded-md bg-white px-2 py-1 text-xs font-medium uppercase shadow">
                  to do
                </div>
              </div>
              {alltasks
                .filter((task: ITask) => task?.status?.toLowerCase() === "todo")
                .map((task: ITask, index: number) => (
                  <DraggableTask
                    key={task._id.toString()}
                    task={task}
                    index={index}
                  />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        {columns.map((column: Column) => (
          <Droppable key={column._id} droppableId={column.name}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/2 rounded bg-gray-100 p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-md bg-white px-2 py-1 text-xs font-medium uppercase shadow">
                    {column.name}
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-6 w-6 rounded-full"
                      >
                        <Ellipsis size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-10">
                      <DropdownMenuItem
                        className="cursor-pointer"
                        onClick={() => handleRemoveColumn(column._id)}
                      >
                        <Trash className="mr-2" size={14} color="red"/>
                        <span className="text-red-500 hover:text-red-500">Delete</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {alltasks
                  .filter(
                    (task: ITask) =>
                      task?.status?.toLowerCase() === column.name.toLowerCase(),
                  )
                  .map((task: ITask, index: number) => (
                    <DraggableTask
                      key={task._id.toString()}
                      task={task}
                      index={index}
                    />
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
}
