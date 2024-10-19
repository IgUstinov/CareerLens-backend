import express, { Express } from 'express';
import connectDB from './config/database';
import routes from './routes/JobRoutes';
import dotenv from 'dotenv';
import logger from "./config/logger";
import cors from 'cors';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: 'http://localhost:4000'
}));

app.use(express.json());
app.use('/api', routes);

app.use((req, res, next) => {
    logger.info(`Получен запрос: ${req.method} ${req.url}`);
    res.on('finish', () => {
        logger.info(`Отправлен ответ: ${res.statusCode}`);
    });
    next();
});

connectDB();
app.listen(PORT, () => console.log(`CareerLens backend server is running on port ${PORT}`));

export default app;