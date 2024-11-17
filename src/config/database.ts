import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

export const collections: { jobs?: mongoDB.Collection, areas?: mongoDB.Collection } = {}

export const connected_db: { db_connection?: mongoDB.Db } = {};

export async function connectToDatabase() {
    dotenv.config();
    console.log('process.env.DB_CONN_STRING', process.env.DB_CONN_STRING)
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ?? "");
    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME ?? "");
    connected_db.db_connection = db
    
    const jobsCollection: mongoDB.Collection = db.collection(process.env.JOB_COLLECTION_NAME ?? "");

    console.log(jobsCollection)
    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${jobsCollection.collectionName}`);

    //return jobsCollection;
    collections.jobs = jobsCollection;

    const areasCollection: mongoDB.Collection = db.collection("countries");
    collections.areas = areasCollection;

    return db;
}

export async function connectToCollection (collectionName: string) {
    const db = connected_db.db_connection ?? await connectToDatabase();
    const filteredJobsCollection: mongoDB.Collection = db.collection(collectionName);

    console.log(filteredJobsCollection)
    console.log(`Successfully connected to collection: ${filteredJobsCollection.collectionName}`);

    return filteredJobsCollection;
}
