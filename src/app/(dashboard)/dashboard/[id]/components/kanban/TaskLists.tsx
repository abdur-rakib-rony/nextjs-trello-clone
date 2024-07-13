"use client";

import React from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { DraggableTask } from "./DraggableTask";
import { updateTask } from "@/app/actions/taskActions";
import { ITask } from "@/models/Task";
import { Ellipsis, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import { removeColumn } from "@/app/actions/columnActions";
import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
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
                <Badge className="bg-white text-xs uppercase text-black hover:text-white">
                  to do
                </Badge>
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
                  <Badge className="bg-white text-xs uppercase text-black hover:text-white">
                    {column.name}
                  </Badge>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="icon" className="rounded-full w-6 h-6">
                        <Ellipsis size={14} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuItem>
                          <User className="mr-2 h-4 w-4" />
                          <span>Assign User</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleRemoveColumn(column._id)}
                        >
                          <X className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
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
