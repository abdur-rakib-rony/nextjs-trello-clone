import { ITask } from "@/models/Task";
import { Draggable } from "@hello-pangea/dnd";

interface DraggableTaskProps {
  task: ITask;
  index: number;
}

export function DraggableTask({ task, index }: DraggableTaskProps) {
  return (
    <Draggable draggableId={task._id.toString()} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="mb-2 rounded bg-white p-4 shadow"
        >
          <h3 className="text-lg font-semibold">{task.name}</h3>
          <p className="text-sm text-gray-500">Status: {task.status}</p>
        </div>
      )}
    </Draggable>
  );
}
