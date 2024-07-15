import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ColumnCreator from "./ColumnCreator";

interface createButtonProps {
  projectId: string;
}

const CreateButton: FC<createButtonProps> = ({ projectId }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Create Column</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Column</DialogTitle>
          <DialogDescription>You can create 5 column only.</DialogDescription>
        </DialogHeader>
        <ColumnCreator projectId={projectId}/>
      </DialogContent>
    </Dialog>
  );
};

export default CreateButton;
