import { ObjectId } from "mongodb";

export default class Job {
    id: ObjectId;
    experience: string;
    name: string;
}