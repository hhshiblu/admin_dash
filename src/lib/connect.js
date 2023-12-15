import { MongoClient, Db } from "mongodb";

let db;
/**
 * @returns {Promise<Db>} - Returns a promise that resolves to the database
 */
const connectToDB = async () => {
  if (!db) {
    const client = await MongoClient.connect(process.env.DATABASE_URL);
    db = client.db("ecom-Shop");
  }

  return db;
};

export default connectToDB;
