// src/models/Job.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { Job } from '../types/Job';

// Переопределим интерфейс документа с заменой id на _id
interface JobDocument extends Omit<Job, 'id'>, Document {
    id: number; // Сохраним id как число для совместимости с интерфейсом Job
}

// Определение схемы для модели Job
const JobSchema: Schema = new Schema<JobDocument>({
    id: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
});

// Создание модели или использование уже существующей
const JobModel: Model<JobDocument> = mongoose.models.Job || mongoose.model<JobDocument>('Job', JobSchema);

export default JobModel;
