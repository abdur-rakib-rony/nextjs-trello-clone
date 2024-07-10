import mongoose, { Mongoose } from "mongoose";

interface ConnectionType {
  isConnected?: number;
}

const connection: ConnectionType = {};

export const connectToDB = async (): Promise<void> => {
  try {
    if (connection.isConnected) {
      console.log("DB is already connected");
      return;
    }

    const db: Mongoose = await mongoose.connect(process.env.MONGO as string);
    connection.isConnected = db.connection.readyState;

    if (connection.isConnected) {
      console.log("DB is connected");
    }
  } catch (error) {
    console.error(error);
    throw new Error(
      error instanceof Error
        ? error.message
        : "Error connecting to the database"
    );
  }
};
