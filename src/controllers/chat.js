import { DATE_UTILS } from '../utils/index.js'
import { ChatDao, MessageDao } from '../daos/index.js'
import logger from '../utils/loggers.js'

const saveChat = async (req, res) => {
    try {
        const startChat = { messages: [], timestamp: DATE_UTILS.getTimestamp() }
        const chat = await ChatDao.saveChat(startChat)
        res.send({ success: true, chatId: chat.id })

    } catch (error) {

        console.log(error, `error from saveChat`);
        logger.error('error desde el saveChat')
        res.send({ success: false, data: undefined, message: "Chat no encontrado" })
    }
}

const updatedChatById = async (req, res) => {
    try {
        const { messageId } = req.body
        const { chatId } = req.params


        const chat = await ChatDao.getChatById(chatId)
        if (!chat) return res.status(404).send({ error: true, message: "Chat no encontrado" })

        const message = await MessageDao.getMessageById(messageId)
        if (!message) return res.status(404).send({ error: true, message: "Mensaje no encontrado" })

        chat.messages.push(message)

        const updatedChat = await ChatDao.updateChatById(chatId, chat)

        res.status(200).send({ success: true, chat: updatedChat, message: "Chat actualizado correctamente" })

    } catch (error) {

        logger.error('error desde el updatedChatById')
        res.status(404).send({ success: false, data: undefined, message: "Chat no encontrado" })

    }
}


const messagesInChat = async (req, res) => {
    try {
        const { chatId } = req.params

        const chat = await ChatDao.getChatById(chatId)
        if (!chat) return res.status(404).send({ error: true, message: "Chat no encontrado" })

        const messagesInChat = await chat.messages
        // console.log(messagesInChat);

        res.status(200).send({ success: true, messagesInChat: messagesInChat })

    } catch (error) {

        logger.error('error desde el messagesInChat')
        res.status(404).send({ success: false, data: undefined, message: "Chat no encontrado" })
    }

}

const chatById = async (req, res) => {
    try {
        const { id } = req.params

        const chat = await ChatDao.getChatById(id)

        if (!chat) {
            return res.status(404).send({ success: false, data: undefined, message: "Chat no encontrado" })
        }

        res.status(200).send({ success: true, data: chat, message: "Chat localizado" })

    } catch (error) {

        logger.error('error desde el chatById')
        res.status(404).send({ success: false, data: undefined, message: "Chat no encontrado" })
    }
}


export const ChatController = { saveChat, updatedChatById, messagesInChat, chatById, }