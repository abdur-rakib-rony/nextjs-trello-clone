import { FC } from "react";
import { getColumns } from "@/app/actions/columnActions";
import { getTasksByProject } from "@/app/actions/taskActions";
import TaskLists from "./TaskLists";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface tasksProps {
  projectName: string;
}

const Tasks: FC<tasksProps> = async ({ projectName }) => {
  const alltasks = await getTasksByProject({ projectName });
  const columns = await getColumns();

  return (
    <div className="scrollbar-hide mt-8 overflow-x-scroll md:overflow-visible">
      {alltasks.length === 0 ? (
        <Alert className="mb-4 w-fit">
          <Terminal className="h-4 w-4" />
          <AlertTitle>No Tasks Available?</AlertTitle>
          <AlertDescription>
            Don&apos;t worry, you can create your tasks from here.
          </AlertDescription>
        </Alert>
      ) : (
        <TaskLists alltasks={alltasks} columns={columns} />
      )}
    </div>
  );
};

export default Tasks;
