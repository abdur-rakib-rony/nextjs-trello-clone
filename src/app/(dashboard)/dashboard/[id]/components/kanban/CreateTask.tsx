import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TaskCreator from "./TaskCreator";

interface CreateTaskProps {
  projectName: string;
}

export default function CreateTask({ projectName }: CreateTaskProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
          <DialogDescription>
            You can create new task from here.
          </DialogDescription>
        </DialogHeader>
        <TaskCreator projectName={projectName} />
      </DialogContent>
    </Dialog>
  );
}
