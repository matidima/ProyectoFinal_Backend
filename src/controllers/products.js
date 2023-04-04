import fs from 'fs';
import { ProductDao } from '../daos/index.js'
import { AdminModel } from '../models/index.js';
import { DATE_UTILS, JOI_VALIDATOR } from '../utils/index.js';
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
        const { email, password, title, description, code, price, thumbnail, stock } = req.body
        const admin = await AdminModel.findOne({email: email})
        if (!admin) {
            console.log("Admin not found with email: " + email);
            res.status(404).send({ success: false, message: "El email ingresado no tiene acceso" })
        }
        if (password != admin.password) {
            console.log("Invalid Password");
            res.status(404).send({ success: false, message: "Contraseña incorrecta" }) 
        }
        else {
            const product = await JOI_VALIDATOR.product.validateAsync({ title, description, code, price, thumbnail, stock, timestamp: DATE_UTILS.getTimestamp() })
            const file = await fs.promises.readFile('./src/db/products.json', 'utf-8')
            const allProducts = JSON.parse(file)
            allProducts.push(product)
            await fs.promises.writeFile('./src/db/products.json', JSON.stringify(allProducts, null, 3))
            res.status(200).send({ success: true, message: "Producto creado", data: allProducts })
        };        

    } catch (error) {
        logger.error("createProduct error:" + error )
        res.status(404).send({ success: false, message: "Producto no encontrado" })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params
        const { email, password } = req.body
        const admin = await AdminModel.findOne({email: email})
        if (!admin) {
            console.log("Admin not found with email: " + email);
            res.status(404).send({ success: false, message: "El email ingresado no tiene acceso" })
        }
        if (password != admin.password) {
            console.log("Invalid Password");
            res.status(404).send({ success: false, message: "Contraseña incorrecta" }) 
        }
        else {
            const product = await ProductDao.deleteById(id)
            if (!product) {
                res.status(404).send({ success: false, data: undefined, message: "Producto no encontrado" })
            } else {   
            res.status(200).send({ success: true, message: "Producto eliminado" })
        };   
        }

    } catch (error) {
        logger.error("deleteProduct error:" + error )
        res.status(404).send({ success: false, message: "Producto no encontrado" })
    }

}

const importProducts = async (req, res) => {
    try {
        const { email, password } = req.body
        const admin = await AdminModel.findOne({email: email})
        console.log(admin)
        if (!admin) {
            console.log("Admin not found with email: " + email);
            res.status(404).send({ success: false, message: "El email ingresado no tiene acceso" })
        }
        if (password != admin.password) {
            console.log("Invalid Password");
            res.status(404).send({ success: false, message: "Contraseña incorrecta" }) 
        }
        else {
            const data = JSON.parse(fs.readFileSync('./src/db/products.json', 'utf8'));
            const products = await ProductDao.insertProducts(data)
            res.status(200).send({ success: true, data: products, message: "Productos subidos a la base de datos" })
        };    
    } catch (error) {
        logger.error("ImportProducts error:" + error )
        res.status(404).send({ success: false, message: "Producto no encontrado" })
    }

}

export const ProductController = { getAll, getById, createProduct, deleteProduct, importProducts }