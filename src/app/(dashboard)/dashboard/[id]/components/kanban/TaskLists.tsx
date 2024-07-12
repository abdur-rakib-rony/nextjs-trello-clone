"use client";

import React from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { DraggableTask } from "./DraggableTask";
import { updateTask } from "@/app/actions/taskActions";
import { ITask } from "@/models/Task";

interface Column {
  id: string;
  name: string;
}

interface TaskListsProps {
  alltasks: ITask[];
  columns: Column[];
}

export function TaskLists({ alltasks, columns }: TaskListsProps) {
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

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        {columns.map((column: Column) => (
          <Droppable key={column.id} droppableId={column.name}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="w-1/2 rounded bg-gray-100 p-4"
              >
                <h2 className="mb-4 text-xl font-bold">{column.name}</h2>
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
