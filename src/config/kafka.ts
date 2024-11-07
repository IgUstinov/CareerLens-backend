import { Kafka } from 'kafkajs';
import logger from './logger';

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID ?? "backend",
    brokers: [process.env.KAFKA_BROKER ?? "kafka:9092"]
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'Backend' });

export async function sendMessage(topic: string, message: string) {
    await producer.connect();
    await producer.send({
        topic,
        messages: [{ value: message }],
    });
    await producer.disconnect();
    logger.info(`Message sent: ${message}`);
}

export async function startConsumer(topic: string) {
    await consumer.connect();
    await consumer.subscribe({ topic, fromBeginning: true });

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                partition,
                offset: message.offset,
                value: message.value?.toString(),
            });
        },
    });
}
