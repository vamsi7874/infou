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
        return await db.collection(collectionName).find({},{projection :{_id : 0}}).toArray();
    } catch (err) {
        console.error(`Error finding all documents in '${collectionName}':`, err);
        return [];
    }
};

export const insertOne = async (collectionName: string, insertObj: any): Promise<any> => {
    try {
        const db = await getDb();
        await createCollection(collectionName, db); // Await the creation
        return await db.collection(collectionName).insertOne(insertObj);
    } catch (err) {
        console.error(`Error inserting one document into '${collectionName}':`, err);
        return null;
    }
};


const createCollection = async (collectionName: string, db: any): Promise<void> => {
    const collections = await db.listCollections({ name: collectionName }).toArray();
    if (collections.length === 0) {
        await db.createCollection(collectionName);
        console.log(`Collection '${collectionName}' created successfully.`);
    }
};






