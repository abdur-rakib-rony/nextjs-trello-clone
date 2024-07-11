import mongoose, { Schema, Document, Types } from "mongoose";

export interface IColumn extends Document {
  _id: Types.ObjectId;
  name: string;
}

const ColumnSchema: Schema<IColumn> = new Schema({
  name: { type: String, required: true },
});

export default mongoose.models.TrennyColumn ||
  mongoose.model<IColumn>("TrennyColumn", ColumnSchema);
