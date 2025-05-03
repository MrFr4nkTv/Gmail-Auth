import { MongoClient } from 'mongodb';

const url = process.env.DB_URL || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'gmailAuthApp';

let db: any;

export const connectToDatabase = async () => {
    if (!db) {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        db = client.db(dbName);
    }
    return db;
};

export const getUserCollection = async () => {
    const database = await connectToDatabase();
    return database.collection('users');
};