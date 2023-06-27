import mongoose, { ConnectOptions } from "mongoose";

let isConnected = false; // track the connection

export const connectToDB = async (): Promise<void> => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    return;
  }

  try {
    const DB = (process.env.DATABASE as string).replace(
      "<PASSWORD>",
      process.env.DATABASE_PASSWORD as string
    );

    await mongoose.connect(DB, {
      dbName: "cuhadarogluDB",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);

    isConnected = true;

    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to database:", error);
  }
};
