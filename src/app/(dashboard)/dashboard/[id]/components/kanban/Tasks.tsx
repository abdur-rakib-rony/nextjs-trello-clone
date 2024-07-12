import { getColumns } from "@/app/actions/columnActions";
import { getAllTasks } from "@/app/actions/taskActions";
import { TaskLists } from "./TaskLists";

const Tasks = async () => {
  const alltasks = await getAllTasks();
  const columns = await getColumns();

  return (
    <div className="mt-8">
      <TaskLists alltasks={alltasks} columns={columns} />
    </div>
  );
};

export default Tasks;
