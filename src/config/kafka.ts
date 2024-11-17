import { Kafka } from 'kafkajs';
import logger from './logger';
import { v4 as uuidv4 } from 'uuid';
import { kafkaEventEmitter } from '../emmiters/eventEmmiter';

const kafka = new Kafka({
    clientId: process.env.KAFKA_CLIENT_ID ?? "backend",
    brokers: [process.env.KAFKA_BROKER ?? "kafka:9092"]
});

export const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: 'Backend' });
export const requestId = uuidv4();

export async function sendMessage(topic: string, message: string) {
    await producer.connect();
    await producer.send({
        topic,
        messages: [{ value: message }],
    });
    await producer.disconnect();
    logger.info(`Message sent: ${message}`);
}

// let isConsumerRunning = false;

export async function startConsumer(topic: string) {
    console.log("inside startConsumer before  if")

    // if (!isConsumerRunning) {
        await consumer.connect();
        await consumer.subscribe({ topic, fromBeginning: true });
        // isConsumerRunning = true;

        console.log("inside startConsumer before  consumer.run(")

        await consumer.run({
            eachMessage: async ({ message }) => {
                console.log("inside consumer.run() ") 

                const messageValue = message.value?.toString();
                console.log("inside message ", message) 
                console.log("messageValue ", messageValue) 
                if (messageValue) {
                    const messageValueJson = JSON.parse(JSON.parse(messageValue))
                    const isThisRequestId = messageValueJson.requestId == requestId;
                    if (!isThisRequestId) {
                        return;
                    }
                    kafkaEventEmitter.emit('message', messageValue); 
                }
            },
        });
    // } else {
    //     console.log(`Consumer уже запущен для топика ${topic}`);
    // }
}

