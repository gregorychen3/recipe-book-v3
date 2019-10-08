import mongoose from "mongoose";
import { MONGODB_URI } from "../config";
import l from "../logger";

const MONGO_CONN_OPTS = { useNewUrlParser: true };

export const initConnection = () => {
  l.info(`Connecting to mongo at ${MONGODB_URI}`);
  mongoose.connect(MONGODB_URI, MONGO_CONN_OPTS, err => {
    if (err) {
      l.error("Failed to connect to mongo");
      process.exit(1);
    }
    l.info("Successfully connected to mongo");
  });
};
