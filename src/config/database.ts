import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { jobs?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ?? "");
    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME ?? "default_db_name");
    const jobsCollection: mongoDB.Collection = db.collection(process.env.JOB_COLLECTION_NAME ?? "jobs");

    collections.jobs = jobsCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${jobsCollection.collectionName}`);
}
