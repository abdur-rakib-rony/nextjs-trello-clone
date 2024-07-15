import { FC } from "react";
import { getTasksByProject } from "@/app/actions/taskActions";
import TaskLists from "./TaskLists";
import { Terminal } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { getColumnsByProjectName } from "@/app/actions/projectActions";

interface tasksProps {
  projectName: string;
  projectId: string;
}

const Tasks: FC<tasksProps> = async ({ projectName, projectId }) => {
  const alltasks = await getTasksByProject({ projectName });
  const columns: string[] | null = await getColumnsByProjectName(projectName);

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
        <TaskLists
          alltasks={alltasks}
          columns={columns || []}
          projectId={projectId}
        />
      )}
    </div>
  );
};

export default Tasks;
