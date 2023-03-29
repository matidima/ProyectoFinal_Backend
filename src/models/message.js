import { Schema } from "mongoose";

const MessageCollection = 'messages'

const MessageSchema = new Schema(
    {   
        text: { type: String, require: true },
        timestamp: { type: String, require: true },
    },
)



export const MessagesModel = { MessageSchema, MessageCollection }