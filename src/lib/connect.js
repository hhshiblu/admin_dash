import { MongoClient } from "mongodb";

const connectToDB = async () => {
  const client = await MongoClient.connect(process.env.DATABASE_URL);
  return client.db("ecom-Shop");
};

export default connectToDB;
// import mongoose from "mongoose";

// async function connectDB() {
//   try {
//     await mongoose.connect(process.env.DATABASE_URL);
//   } catch (error) {
//     console.error("Error connecting to MongoDB:", error);
//   }
// }

// export default connectDB;
