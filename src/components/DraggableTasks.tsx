import { Draggable } from "@hello-pangea/dnd";

export default function DraggableTodo({ todo, index }: any) {
  return (
    <Draggable draggableId={todo._id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 rounded bg-white p-4 shadow"
        >
          <h3 className="text-lg font-semibold">{todo.title}</h3>
          <p className="text-sm text-gray-500">Status: {todo.status}</p>
        </div>
      )}
    </Draggable>
  );
}
