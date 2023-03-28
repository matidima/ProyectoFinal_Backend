import { config } from '../config/config.js'
import mongoose from "mongoose";
import logger from '../utils/loggers.js';

const init = async () => {
    mongoose.set('strictQuery', false)
    try {
        mongoose.connect(config.DATABASE.mongo.dburl, {
            dbName: config.DATABASE.mongo.dbName
        })

    } catch (error) {
        logger.error(error);
    }
}

export const MongoDBService = { init }