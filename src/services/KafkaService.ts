import { Request, Response } from 'express';
import { sendMessage, requestId, startConsumer } from '../config/kafka';
import logger from '../config/logger';
import { kafkaEventEmitter } from '../emmiters/eventEmmiter';

class KafkaService {

    async refreshAreas(): Promise<void> {
        try {
            const objectToKafka = {
                addCountries: true
            }
            await sendMessage('Backend', JSON.stringify(objectToKafka));
            logger.info('Message refreshAreas sent to Kafka');
        } catch (error) {
            logger.error('Message refreshAreas didnt send to Kafka');
        }
    }

    async sendAll(filterData: any): Promise<void> {
        try {
            const objectToKafka = {
                requestId,
                filterData
            }
            
            await sendMessage('Backend', JSON.stringify(objectToKafka));
            logger.info('Message all sent to Kafka');
        } catch (error) {
            logger.error('Message didnt send to Kafka');
        }
    }

    async refreshJobs(): Promise<void> {
        const collectData = { count: 10 }
        try {
            const objectToKafka = {
                collectData
            }
            await sendMessage('Backend', JSON.stringify(objectToKafka));
            logger.info('Message refreshJobs sent to Kafka');
        } catch (error) {
            logger.error('Message refreshJobs didnt send to Kafka');
        }
    }

    
    async getCollectionNameFromKafka(): Promise<any> {
        return new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
                reject(new Error('Не удалось получить название коллекции из Kafka'));
            }, 10000); // Таймаут на 5 секунд

            kafkaEventEmitter.once('message', (message: string) => {
                console.log("kafkaEventEmitter", message)
                const messageJson = JSON.parse(message)
                console.log("messageJson", messageJson)
                clearTimeout(timeout);
                console.log("messageJson.collectionName", messageJson.collectionName)
                resolve(messageJson);
            });
        });
    }

    // async getCollectionNameFromKafka(): Promise<string> {
    //     console.log("inside getCollectionNameFromKafka Kafka service before  startConsumer")

    //     return new Promise((resolve, reject) => {
    //         // Подписка на топик с ответами от Python
    //         startConsumer('Python', (message) => {
    //             console.log("inside startConsumer callback ")

    //             const collectionName = message.value; 
    //             console.log("collectionName ", collectionName)// Получаем название коллекции из Kafka
    //             if (collectionName) {
    //                 resolve(collectionName); // Возвращаем название коллекции через промис
    //             } else {
    //                 reject('Ошибка: название коллекции не найдено');
    //             }
    //         }).catch(reject);
    //     });
    // }
}

export default KafkaService;
