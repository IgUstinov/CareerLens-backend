import { Kafka } from 'kafkajs';
import logger from './logger';

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID ?? "",
    brokers: [process.env.KAFKA_BROKER ?? ""]
});

export const producer = kafka.producer();
export const consumer = kafka.consumer({ groupId: 'test-group' });

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
