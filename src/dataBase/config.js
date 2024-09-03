import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const uriConnection = process.env.DB_URI;

export async function connect() {
    try {
        await mongoose.connect(uriConnection, {
            family: 4 
        });
        console.log("Connected to Mongoose database");
    } catch (error) {
        console.log("Error connecting to Mongoose database", error);
    }
}
