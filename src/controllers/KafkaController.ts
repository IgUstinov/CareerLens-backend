import { Request, Response } from 'express';
import { sendMessage } from '../config/kafka';

class KafkaController {
    async sendAll(req: Request, res: Response): Promise<void> {
        try {
            const objectToKafka = {
                "collectData": {
                    count: 1000
                },
                "filterData": {
                    "region": "Москва",
                    "salary": {"$gte": 80000},
                    "experience": null
                }
            }
            await sendMessage('Backend', JSON.stringify(objectToKafka));
            res.status(200).send('Message all sent to Kafka');
        } catch (error) {
            res.status(500).send('Error sending message');
        }
    }
    async sendCollect(req: Request, res: Response): Promise<void> {
        try {
            const objectToKafka = {
                "collectData": {
                    count: 1000
                }
            }
            await sendMessage('Backend', JSON.stringify(objectToKafka));
            res.status(200).send('Message collect sent to Kafka');
        } catch (error) {
            res.status(500).send('Error sending message');
        }
    }
    async sendFilter(req: Request, res: Response): Promise<void> {
        try {
            const objectToKafka = {
                "filterData": {
                    "region": "Москва",
                    "salary": {"$gte": 80000},
                    "experience": null
                }
            }
            await sendMessage('Backend', JSON.stringify(objectToKafka));
            res.status(200).send('Message filter sent to Kafka');
        } catch (error) {
            res.status(500).send('Error sending message');
        }
    }
}

export default KafkaController;
