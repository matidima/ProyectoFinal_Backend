import argv from "../utils/minimist.js";
import dotenv from "dotenv";
dotenv.config()

const config = {
    SERVER:{
        PORT: process.env.PORT || argv.PORT,
        MODO: argv.MODO
    },
    DATABASE: {
        mongo: {
            dburl: process.env.MONGO_DB_URL ,
            dbName: process.env.NAME
        }
    },
    MAIL: {
        USER: process.env.NODEMAILER_USER, 
        PASS: process.env.NODEMAILER_PASS,
    }
}

export { config }