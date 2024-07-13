import mongoose, { Schema, Document, Types } from "mongoose";

export interface ITask extends Document {
  _id: Types.ObjectId;
  name: string;
  projectName?: string;
  summary?: string;
  description?: string;
  assigneeName?: string;
  reporterName?: string;
  labels?: string[];
  priority?: "Low" | "Medium" | "High" | "Urgent";
  teamName?: string;
  status?: string;
  activities?: {
    action: string;
    timestamp: Date;
    user: Types.ObjectId;
  }[];
  comments?: {
    text: string;
    user: Types.ObjectId;
    timestamp: Date;
  }[];
}

const TaskSchema: Schema = new Schema({
  name: { type: String, required: true },
  projectName: { type: String },
  summary: { type: String },
  description: { type: String },
  assigneeName: { type: String },
  reporterName: { type: String },
  labels: [{ type: String }],
  teamName: { type: String },
  priority: {
    type: String,
    enum: ["Low", "Medium", "High", "Urgent"],
    default: "Medium",
  },
  activities: [
    {
      action: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    },
  ],
  comments: [
    {
      text: { type: String, required: true },
      user: { type: Schema.Types.ObjectId, ref: "User", required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
  status: {
    type: String,
    default: "todo",
  },
});

export default mongoose.models.TrennyTask ||
  mongoose.model<ITask>("TrennyTask", TaskSchema);
