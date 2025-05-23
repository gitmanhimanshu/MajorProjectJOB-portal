import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dropIndex = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        await db.collection('users').dropIndex('username_1');
        console.log('Successfully dropped username index');

        await mongoose.connection.close();
        console.log('Disconnected from MongoDB');
    } catch (error) {
        console.error('Error:', error);
    }
};

dropIndex(); 