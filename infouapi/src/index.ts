import express from "express";
import { initilizeDb } from "./common/mongo";
import cookieParser from "cookie-parser";

const appRoutes = require("./routes/app.routes");

import * as dotenv from "dotenv";
const cors = require("cors");

dotenv.config();

const Router = express.Router();

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;
const connection_string = process.env.MONGO_STRING_CONNECTION;
const dbName = process.env.DB;

app.get("/", (req, res) => {
  //render will take 60 sec to restart in free deployment plan.so for to add a check in front end whether is server is up or not
  //added this pretty good check :::::hitting empty server on downtime.
  res.send({ code: 200 });
});

app.use("/app", appRoutes);

const startServer = async () => {
  try {
    if (!connection_string || !dbName) {
      throw new Error(
        "Missing MONGO_STRING_CONNECTION or DB environment variables."
      );
    }
    await initilizeDb(connection_string, dbName);
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error(
      "Failed to start the server due to a database connection error:",
      err
    );
    process.exit(1);
  }
};

startServer();
