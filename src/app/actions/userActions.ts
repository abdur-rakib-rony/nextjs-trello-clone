"use server";
import { connectToDB } from "@/lib/db";
import User, { IUser } from "@/models/User";

export async function getAllUsers(): Promise<Omit<IUser, "password">[]> {
  try {
    await connectToDB();

    const users: IUser[] = await User.find({}, "-password").exec();

    const usersPlain = users.map((user) => ({
      ...user.toObject(),
      _id: user._id.toString(),
    }));

    return usersPlain;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
}
