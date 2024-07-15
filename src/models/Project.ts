import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./User";

export interface IProject extends Document {
  _id: Types.ObjectId;
  name: string;
  members?: Types.ObjectId[] | IUser[];
  columns?: string[];
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true },
    members: [
      { type: Schema.Types.ObjectId, ref: "TrennyUser", required: true },
    ],
    columns: [],
  },
  { timestamps: true },
);

export default mongoose.models.TrennyProjects ||
  mongoose.model<IProject>("TrennyProjects", ProjectSchema);
