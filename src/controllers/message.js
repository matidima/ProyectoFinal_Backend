import { MessageDao } from "../daos/index.js"
import { DATE_UTILS, JOI_VALIDATOR } from "../utils/index.js"
import logger from "../utils/loggers.js"

const getAllMessages = async (req, res) => {
    try {

        const allMesagges = await MessageDao.getAllMessages()
        res.status(200).send({ success: true, data: allMesagges })

    } catch (error) {

        logger.error('error desde el getAllMessages: ' + error)
        res.status(404).send({ success: false, data: undefined, message: "Mensaje no encontrado" })

    }
}

const getMessagesById = async (req, res) => {
    try {

        const { id } = req.params
        const message = await MessageDao.getMessageById(id)

        if (!message) {
            return res.status(404).send({ success: false, data: undefined, message: "Mensaje no encontrado" })
        }

        res.status(200).send({ success: true, data: message, message: "Mensaje encontrado" })

    } catch (error) {
        logger.error('error desde el getMessagesById: ' + error)
        res.status(404).send({ success: false, data: undefined, message: "Mensaje no encontrado" })
    }
}

const saveMessages = async (req, res) => {
    try {

        const { text } = req.body
        const newMessage = await JOI_VALIDATOR.message.validateAsync({ text, timestamp: DATE_UTILS.getTimestamp() })
        const savedMessage = await MessageDao.saveMessage(newMessage)
        res.status(200).send({ success: true, data: savedMessage, message: 'Mensaje guardado con exito' })

    } catch (error) {

        logger.error(error, `error from createProduct`);
        res.status(400).send({ success: false, data: undefined, message: "No pudimos enviar el mensaje" })
    }
}

export const MessageController = { getAllMessages, getMessagesById, saveMessages }