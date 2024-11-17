import logger from "../config/logger";
import Job from "../models/Job";
import {collections, connectToCollection} from "../config/database";
import KafkaService from "./KafkaService";
import { kafkaEventEmitter } from "../emmiters/eventEmmiter";
import Area from "../models/Area";

export class JobService {
    private kafkaService: KafkaService;

    constructor() {
        this.kafkaService = new KafkaService();
    }

    async refreshAreas(): Promise<Area[]> {
        try {
            await this.kafkaService.refreshAreas();
            return await this.getAllAreas();
        } catch (error) {
            logger.error('Error refresh areas:', error);
            throw new Error('Error refresh areas');
        }
    }

    async getAllAreas(): Promise<Area[]> {
        try {
            if (collections.areas) {
                const country = await collections.areas.find({"name": "Россия"}).toArray();
                const typedAreas: Area[] = country[0].areas.map((area: Area) => ({
                    id: area.id,
                    name: area.name,
                }));
                
                const republics: any = country[0].areas.flatMap((republic: { areas: any; }) => republic.areas);

                console.log('republics', republics)

                const republicsAreas: Area[] = republics.map((area: Area) => ({
                    id: area.id,
                    name: area.name,
                }));

                const returnedAreas: Area[] = typedAreas.concat(republicsAreas)
                console.log('returnedAreas', returnedAreas)
                logger.info(`JobService.getAllAreas retrieved areas: ${JSON.stringify(returnedAreas)}`);
                return returnedAreas;
            } else {
                throw new Error("areas = null || undefined");
            }
        } catch (error) {
            logger.error('Error fetching areas:', error);
            throw new Error('Error fetching areas');
        }
    }

    async getJobs(): Promise<Job[]> {
        try {
            if (collections.jobs) {
                const jobs = await collections.jobs.find().toArray();
                console.log('jobs', jobs)
                const typedJobs: Job[] = jobs.map(job => ({
                    id: job._id,
                    name: job.name,
                    experience: job.experience.name,
                    area: job.area.id
                }));
                logger.info(`JobService.getJobs retrieved jobs: ${JSON.stringify(typedJobs)}`);
                return typedJobs;
            } else {
                throw new Error("jobs = null || undefined");
            }
        } catch (error) {
            logger.error('Error fetching jobs:', error);
            throw new Error('Error fetching jobs');
        }
    }

    handleKafkaMessage(message: string) {
        console.log(`Сообщение из Kafka: ${message}`);
        return message;
    }

    async refreshJobs(): Promise<Job[]> {
        try {
            await this.kafkaService.refreshJobs();
            return await this.getJobs();
        } catch (error) {
            logger.error('Error refresh jobs:', error);
            throw new Error('Error refresh jobs');
        }
    }

    async getJobsByFilter(filters: any): Promise<Job[]> {
        try {
            await this.kafkaService.sendAll(filters);
            const collectionName = JSON.parse(await this.kafkaService.getCollectionNameFromKafka()).collectionName;
            const filteredCollection = await connectToCollection(collectionName)
            if (filteredCollection) {
                const jobs = await filteredCollection.find().toArray();
                console.log('jobs', jobs)
                const typedJobs: Job[] = jobs.map(job => ({
                    id: job._id,
                    name: job.name,
                    experience: job.experience.name,
                    area: job.area.id
                }));
                logger.info(`JobService.getJobs retrieved jobs: ${JSON.stringify(typedJobs)}`);
                return typedJobs;
            } else {
                throw new Error("jobs = null || undefined");
            }
        } catch (error) {
            logger.error('Error fetching jobs:', error);
            throw new Error('Error fetching jobs');
        }
    }
}
