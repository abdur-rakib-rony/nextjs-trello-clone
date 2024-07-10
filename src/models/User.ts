import mongoose, { Schema, Document, Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export default mongoose.models.TrennyUser ||
  mongoose.model<IUser>("TrennyUser", UserSchema);
