import { MongoClient, Db } from "mongodb";
let dbInstance: Db;
let client: MongoClient;

export const initilizeDb = async (url: string, dbName: string): Promise<Db | undefined> => {
    if (dbInstance) {
        console.info("Database already connected.");
        return dbInstance;
    }

    try {
        client = new MongoClient(url);
        await client.connect();
        dbInstance = client.db(dbName);
        console.info(`Database '${dbName}' connected successfully!`);
        return dbInstance;
    } catch (err) {
        console.error("Error while connecting to the database:", err);
        return undefined;
    }
};


const getDb = async (): Promise<Db> => {
    if (!dbInstance) {
        throw new Error("Database connection not initialized. Call initilizeDb first.");
    }
    return dbInstance;
};


export const findOne = async (collectionName: string, key: string, value: any): Promise<any | null> => {
    try {
        const db = await getDb();
        return await db.collection(collectionName).findOne({ [key]: value });
    } catch (err) {
        console.error(`Error finding one document in '${collectionName}':`, err);
        return null;
    }
};


export const findAll = async (collectionName: string): Promise<any[]> => {
    try {
        const db = await getDb();
        return await db.collection(collectionName).find({}).toArray();
    } catch (err) {
        console.error(`Error finding all documents in '${collectionName}':`, err);
        return [];
    }
};


export const insertOne = async (collectionName: string, insertObj: any): Promise<any> => {
    try {
        const db = await getDb();
        return await db.collection(collectionName).insertOne(insertObj);
    } catch (err) {
        console.error(`Error inserting one document into '${collectionName}':`, err);
        return null;
    }
};


