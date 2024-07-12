"use client";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
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
  const [summary, setSummary] = useState(task.summary || "");
  const [comment, setComment] = useState("");
  const [assignee, setAssignee] = useState(task.assigneeName || "");
  const [priority, setPriority] = useState<Priority>(
    (task.priority as Priority) || "Medium",
  );
  const [labels, setLabels] = useState(task.labels || []);

  const handleSave = async () => {
    const updates = {
      summary,
      description,
      assigneeName: assignee,
      newComment: comment,
      priority,
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
              className={`${task.priority === "High" ? "bg-green-100" : task.priority === "Urgent" ? "bg-red-100" : "bg-white"} mb-2`}
            >
              <CardHeader>
                <CardTitle>{task.name}</CardTitle>
                <CardDescription>{task.projectName}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 font-medium capitalize text-xs">Status: {task.status}</p>
                <p className="text-gray-500 font-medium capitalize text-xs mt-2">Priority: <Badge>{task.priority}</Badge></p>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{task.name}</DialogTitle>
              <DialogDescription>{task.projectName}</DialogDescription>
            </DialogHeader>
            <div className="flex max-h-[60vh] flex-col overflow-y-scroll scrollbar-hide sm:max-w-[60vw] md:max-w-[600px]">
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
                  <Label className="text-right">Priority</Label>
                  <div className="col-span-3 flex space-x-2">
                    {(Object.keys(priorityColors) as Priority[]).map(
                      (level) => (
                        <Badge
                          key={level}
                          className={`cursor-pointer ${priorityColors[level]} ${
                            priority === level ? "ring-2 ring-offset-2" : ""
                          }`}
                          onClick={() => setPriority(level)}
                        >
                          {level}
                        </Badge>
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
