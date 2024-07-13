"use client";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Draggable } from "@hello-pangea/dnd";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { updateTask } from "@/app/actions/taskActions";
import { ITask } from "@/models/Task";
import moment from "moment";
import { ClientUserSelector } from "./ClientUserSelector";
import { getFirstCharacter } from "@/utils/getFirstCharacter";

interface DraggableTaskProps {
  task: ITask;
  index: number;
}

type Priority = "Low" | "Medium" | "High" | "Urgent";

const priorityColors: Record<Priority, string> = {
  Low: "bg-green-400 hover:bg-green-500",
  Medium: "bg-yellow-400 hover:bg-yellow-500",
  High: "bg-orange-400 hover:bg-orange-500",
  Urgent: "bg-red-400 hover:bg-red-500",
};

export function DraggableTask({ task, index }: DraggableTaskProps) {
  const [description, setDescription] = useState(task.description || "");
  const [assigneeName, setAssigneeName] = useState(task.assigneeName || "");
  const [summary, setSummary] = useState(task.summary || "");
  const [comment, setComment] = useState("");
  const [priority, setPriority] = useState<Priority>(
    (task.priority as Priority) || "Medium",
  );
  const [labels, setLabels] = useState(task.labels || []);

  const handleSave = async () => {
    const updates = {
      summary,
      description,
      newComment: comment,
      priority,
      assigneeName: assigneeName,
      labels,
    };

    const result = await updateTask(task._id.toString(), updates);
    if (result.success) {
      toast({
        title: "Task updated",
        description: result.message,
      });
    } else {
      toast({
        title: "Error",
        description: "Task not updated",
        variant: "destructive",
      });
    }
  };

  return (
    <Draggable draggableId={task._id.toString()} index={index}>
      {(provided) => (
        <Dialog>
          <DialogTrigger asChild>
            <Card
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className="mb-2 overflow-hidden shadow-md transition-shadow duration-200 hover:shadow-lg"
            >
              <div
                className={`${task.priority === "High" ? "bg-green-400" : task.priority === "Urgent" ? "bg-red-400" : "bg-white"} h-1`}
              />
              <div className="p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{task.name}</h3>
                  <span
                    className={`${task.priority === "High" ? "bg-green-400" : task.priority === "Urgent" ? "bg-red-400" : "bg-white"} rounded-full px-2 py-1 text-xs font-medium`}
                  >
                    {task.priority}
                  </span>
                </div>
                <p className="mb-3 text-sm text-gray-600">{task.projectName}</p>
                <p className="mb-4 text-sm text-gray-700">
                  {task.description
                    ? task.description.length > 100
                      ? task.description.slice(0, 100) + "..."
                      : task.description
                    : "No description"}
                </p>
                <div className="mb-3 flex flex-wrap gap-2">
                  <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                    {task.status}
                  </span>
                  <span className="rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                    Reporter: {task.reporterName}
                  </span>
                </div>
                {task.assigneeName && (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="mr-2 rounded bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                        Assignee:
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="mr-2 h-6 w-6 rounded-full bg-blue-300 text-xs hover:bg-blue-300"
                      >
                        {getFirstCharacter(task.assigneeName)}
                      </Button>
                      <span className="text-sm text-gray-600">
                        {task.assigneeName}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{task.name}</DialogTitle>
              <DialogDescription>{task.projectName}</DialogDescription>
            </DialogHeader>
            <div className="scrollbar-hide flex max-h-[60vh] flex-col overflow-y-scroll sm:max-w-[60vw] md:max-w-[600px]">
              <div className="grid gap-4 py-4">
                <div>
                  <Label htmlFor="description" className="text-right">
                    Summary
                  </Label>
                  <Textarea
                    id="description"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div>
                  <Label htmlFor="assignee" className="text-right">
                    Assignee
                  </Label>
                  <ClientUserSelector
                    value={assigneeName}
                    onChange={setAssigneeName}
                  />
                </div>
                <div>
                  <Label className="text-right">Priority</Label>
                  <div className="col-span-3 flex space-x-2">
                    {(Object.keys(priorityColors) as Priority[]).map(
                      (level) => (
                        <div
                          key={level}
                          className={`cursor-pointer rounded-md bg-white px-2 py-1 text-xs font-medium uppercase shadow ${priorityColors[level]} ${
                            priority === level ? "ring-2 ring-offset-2" : ""
                          }`}
                          onClick={() => setPriority(level)}
                        >
                          {level}
                        </div>
                      ),
                    )}
                  </div>
                </div>
                <div>
                  <Label htmlFor="labels" className="text-right">
                    Labels
                  </Label>
                  <Input
                    id="labels"
                    value={labels.join(", ")}
                    onChange={(e) =>
                      setLabels(
                        e.target.value.split(",").map((label) => label.trim()),
                      )
                    }
                    placeholder="Enter labels separated by commas"
                    className="col-span-3"
                  />
                </div>
                <div>
                  <Label htmlFor="comment" className="text-right">
                    New Comment
                  </Label>
                  <Textarea
                    id="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="col-span-3"
                  />
                </div>

                <div>
                  <Label className="text-right">Comments</Label>
                  <ScrollArea className="col-span-3 h-[150px] w-full rounded-md border p-4">
                    {task.comments?.map((comment, index) => (
                      <div key={index} className="my-2 text-sm">
                        <h1 className="font-medium">{comment.text}</h1>
                        <p className="text-xs text-gray-500">
                          {moment(comment.timestamp).fromNow()}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </div>

                <div>
                  <Label className="text-right">Activities</Label>
                  <ScrollArea className="col-span-3 h-[150px] w-full rounded-md border p-4">
                    {task.activities?.map((activity, index) => (
                      <div key={index} className="my-2 text-sm">
                        <h1 className="font-medium">{activity.action}</h1>
                        <p className="text-xs text-gray-500">
                          {moment(activity.timestamp).fromNow()}
                        </p>
                      </div>
                    ))}
                  </ScrollArea>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleSave}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Draggable>
  );
}
