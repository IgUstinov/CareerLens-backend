import { Request, Response } from 'express';
import { sendMessage } from '../config/kafka';

class KafkaController {
    async send(req: Request, res: Response): Promise<void> {
        try {
            await sendMessage('test-topic', 'Hello Kafka');
            res.status(200).send('Message sent to Kafka');
        } catch (error) {
            res.status(500).send('Error sending message');
        }
    }
}

export default KafkaController;
