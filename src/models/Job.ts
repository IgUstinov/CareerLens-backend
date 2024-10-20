import { ObjectId } from "mongodb";

export default class Job {
    id: ObjectId;
    description: string;
    title: string;
}