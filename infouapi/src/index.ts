import express from 'express';
import {initilizeDb} from "./common/mongo"
const appRoutes = require("./routes/app.routes");


import * as dotenv from 'dotenv';

dotenv.config();

const Router = express.Router();

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
const connection_string = process.env.MONGO_STRING_CONNECTION;
const dbName = process.env.DB;

app.get('/', (req, res) => {
    res.send('<h1 style="color:red;">Info You Backend!</h1>');
});

app.use("/app",appRoutes);

const startServer = async () => {
    try {
        if (!connection_string || !dbName) {
            throw new Error("Missing MONGO_STRING_CONNECTION or DB environment variables.");
        }
        await initilizeDb(connection_string, dbName);
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Failed to start the server due to a database connection error:", err);
        process.exit(1);
    }
};

startServer();


