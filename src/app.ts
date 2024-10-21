import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectToDatabase } from "./config/database"
import routes from "./routes/JobRoutes";
import {startConsumer} from "./config/kafka";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors({
    origin: process.env.CORS_FRONTEND
}));

app.use(express.json());

connectToDatabase()
    .then(() => {
        app.use('/api', routes);

        app.use((req: Request, res: Response, next: NextFunction) => {
            console.log(`Request: ${req.method} ${req.url}`);
            res.on('finish', () => {
                console.log(`Response: ${res.statusCode}`);
            });
            next();
        });
        startConsumer('test-topic').catch(console.error);

        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    });


export default app;