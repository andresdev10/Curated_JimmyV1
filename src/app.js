import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connect } from './dataBase/config.js';
import router from './routes/index.js';
import Bot from './utils/bots.js';

const bot = new Bot();
const bots = ["IG", "Twitter", "Pinterest", "Tumblr"];

const app = express();
dotenv.config();
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev'))
app.use('/', router);

const port  = process.env.PORT || 3003;
const start = async () => {
    try {
        await connect();  
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
        await bot.init(bots);
    } catch (error) {
        console.error("Failed to connect to the database", error);
    }
}

start();
