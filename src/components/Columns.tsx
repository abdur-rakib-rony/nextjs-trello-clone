"use client";
import DraggableTasks from "./DraggableTasks";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

export default function Columns({ todos }: any) {
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

    const newStatus = destination.droppableId as "pending" | "completed";
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex gap-4">
        <Droppable droppableId="pending">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-1/2 rounded bg-gray-100 p-4"
            >
              <h2 className="mb-4 text-xl font-bold">Pending</h2>
              {todos
                .filter((todo: any) => todo.status === "pending")
                .map((todo: any, index: any) => (
                  <DraggableTasks key={todo._id} todo={todo} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId="completed">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="w-1/2 rounded bg-gray-100 p-4"
            >
              <h2 className="mb-4 text-xl font-bold">Completed</h2>
              {todos
                .filter((todo: any) => todo.status === "completed")
                .map((todo: any, index: any) => (
                  <DraggableTasks key={todo._id} todo={todo} index={index} />
                ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    </DragDropContext>
  );
}
