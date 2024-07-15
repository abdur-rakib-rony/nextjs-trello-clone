"use client";

import { FC } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import DraggableTask from "./DraggableTask";
import { updateTask } from "@/app/actions/taskActions";
import { ITask } from "@/models/Task";
import { Ellipsis, Trash } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { removeColumn } from "@/app/actions/projectActions";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskListsProps {
  alltasks: ITask[];
  columns: string[];
  projectId: string;
}

const TaskLists: FC<TaskListsProps> = ({ alltasks, columns, projectId }) => {
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

  const handleRemoveColumn = async (columnName: string) => {
    try {
      const result = await removeColumn(projectId, columnName);
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
              className="min-w-56 rounded bg-gray-100 p-4 md:w-1/2"
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
        {columns.map((column: string) => (
          <Droppable key={column} droppableId={column}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="min-w-56 rounded bg-gray-100 p-4 md:w-1/2"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="rounded-md bg-white px-2 py-1 text-xs font-medium uppercase shadow">
                    {column}
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
                        onClick={() => handleRemoveColumn(column)}
                      >
                        <Trash className="mr-2" size={14} color="red" />
                        <span className="text-red-500 hover:text-red-500">
                          Delete
                        </span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                {alltasks
                  .filter(
                    (task: ITask) =>
                      task?.status?.toLowerCase() === column.toLowerCase(),
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
};

export default TaskLists;
