import { mongoDBContainer } from "../containers/mongoDBContainer.js";
import { ChatModel } from "../models/index.js";

export class ChatsMongo extends mongoDBContainer {

    static getInstance() {
        return new ChatsMongo()
    }

    constructor() {

        if (typeof ChatsMongo.instance === 'object') {
            return ChatsMongo.instance
        }

        super({
            name: ChatModel.ChatCollection,
            schema: ChatModel.ChatSchema
        });

        ChatsMongo.instance = this
        return this
    }

    async saveChat(element) {
        try {
            return await super.save(element)
        } catch (error) {
            logger.error(`error in saveChat-ChatsMongo - Error: `, error)
        }
    }

    async getChatById(id) {
        try {
            return await this.model.findById(id).populate('messages')
        } catch (error) {
            logger.error(`error in getChatById-ChatsMongo - Error: `, error)
        }
    }

    async updateChatById(id, newData) {
        try {
            return await super.updateById(id, newData)
        } catch (error) {
            logger.error(`error in updateChatById-ChatsMongo - Error: `, error)
        }
    }

}