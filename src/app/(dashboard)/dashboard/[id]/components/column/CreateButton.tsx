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

const CreateButton: FC = () => {
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
        <ColumnCreator />
      </DialogContent>
    </Dialog>
  );
};

export default CreateButton;
