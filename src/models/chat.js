import { Schema } from "mongoose";

const ChatCollection = 'chats'

const ChatSchema = new Schema(
    {
        timestamp: { type: String, require: true },
        messages: [{ type: Schema.Types.ObjectId, ref: 'messages' }],
    },
)


export const ChatModel = { ChatSchema, ChatCollection }