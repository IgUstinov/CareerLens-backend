import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { jobs?: mongoDB.Collection } = {}

export async function connectToDatabase () {
    dotenv.config();
    console.log('process.env.DB_CONN_STRING', process.env.DB_CONN_STRING)
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ?? "");
    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME ?? "");
    const jobsCollection: mongoDB.Collection = db.collection(process.env.JOB_COLLECTION_NAME ?? "");

    console.log(jobsCollection)
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${jobsCollection.collectionName}`);

    //return jobsCollection;
    collections.jobs = jobsCollection;

}
