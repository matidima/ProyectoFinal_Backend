import { ProductDao } from '../daos/index.js'
import { DATE_UTILS } from '../utils/index.js';
import { JOI_VALIDATOR } from "../utils/index.js";
import logger from '../utils/loggers.js';

const getAll = async (req, res) => {
    try {
        const productos = await ProductDao.getAll()
        res.status(200).send({ success: true, message: "Productos encontrados", data: productos })
    } catch (error) {
        logger.error("getAll error:" + error )
        res.status(404).send({ success: false, message: "Producto no encontrado" })
    }
}

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductDao.getById(id)
        if (!product) {
            return res.status(404).send({ success: false, message: "Producto no encontrado" })
        }
        res.status(200).send({ success: true, message: "Producto encontrado", data: product })
    } catch (error) {
        logger.error("getById error:" + error )
        res.status(404).send({ success: false, message: "Producto no encontrado" })
    }
}

const createProduct = async (req, res) => {
    try {
        const { title, description, code, price, thumbnail, stock } = req.body

        const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, price, thumbnail, stock, timestamp: DATE_UTILS.getTimestamp() })
        await ProductDao.save(product)

        res.status(200).send({ success: true, message: "Producto creado", data: product })
    } catch (error) {
        logger.error("createProduct error:" + error )
        res.status(404).send({ success: false, message: "Producto no encontrado" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const product = await ProductDao.deleteById(id)

        if (!product) {
            return res.status(404).send({ success: false, data: undefined, message: "Producto no encontrado" })
        }

        res.status(200).send({ success: true, message: "Producto eliminado" })
    } catch (error) {
        logger.error("deleteProduct error:" + error )
        res.status(404).send({ success: false, message: "Producto no encontrado" })
    }

}

export const ProductController = { getAll, getById, createProduct, deleteProduct }