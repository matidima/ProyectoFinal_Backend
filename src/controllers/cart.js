import { DATE_UTILS, EMAIL_UTILS } from '../utils/index.js'
import { CartDao, ProductDao } from '../daos/index.js'
import logger from '../utils/loggers.js'
import { config } from '../config/config.js'
import { UserModel } from '../models/user.js'


const saveCart = async (req, res) => {
  try {
      const startCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] }
      const cart = await CartDao.saveCart(startCart)
      res.send({ success: true, cartId: cart.id })
  } catch (error) {
      logger.error('error desde el saveCart')
      res.send({ success: false, data: undefined, message: "Error de carrito" })
  }
}

const updatedCartById = async (req, res) => {
    try {
        const { productId } = req.body
        const { cantidad } = req.body
        const { cartId } = req.params

        const cart = await CartDao.getCartById(cartId)
        if (!cart) return res.status(404).send({ error: true, message: "Error de carrito" })

        const product = await ProductDao.getById(productId)
        if (!product) {
            res.status(404).send('Producto no encontrado');
        } 
        if (cantidad > product.stock){
            res.status(400).send('No hay suficiente stock disponible para la compra')
        }
        else {
            const stockUpdate = product.stock -= cantidad;
            await ProductDao.updateById(productId, {stock: stockUpdate} )
            const productToCart = { _id: productId, cantidad }
            cart.products.push(productToCart)
            const updatedCart = await CartDao.updateCartById(cartId, cart)
            
            res.status(200).send({ success: true, cart: updatedCart, message: "Carrito actualizado correctamente" })
        }
    } catch (error) {
        console.log(error)
        logger.error('error desde el updatedCartById')
        res.status(404).send({ success: false, data: undefined, message: "Error de carrito" })
    }
}

const deleteCart = async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartDao.deleteCartById(cartId)
        if (!cart) return res.status(404).send({ success: false, message: DATE_UTILS.MESSAGES.NO_CART })

        res.status(204).send({ success: true, message: "Carrito eliminado con éxito" })

    } catch (error) {
        logger.error('error desde el deleteCart')
        res.send({ success: false, data: undefined, message: "Error de carrito" })
    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        const { cartId } = req.params
        const { id_prod } = req.params

        const cart = await CartDao.getCartById(cartId)
        if (!cart) {
          res.status(404).send( { error: true, message: "Error de carrito" } )}
        else {
            const product = await ProductDao.getById(id_prod)
            if (!product) return res.status(404).send({ error: true, message: "Error de producto" })

            const foundElementIndex = cart.products.findIndex(element => element._id == id_prod)
            if (foundElementIndex === -1) return res.status(404).send({ error: true, message: "Error de producto" })
            cart.products.splice(foundElementIndex, 1)
          }

          const updatedCart = await CartDao.updateCartById(cartId, cart)
          res.status(200).send({ success: true, message: "Se elimino el producto del carrito", data: updatedCart })

    } catch (error) {
        
        logger.error('error desde el deleteProductFromCart')
        res.status(404).send({ success: false, data: undefined, message: "error de carrito" })

    }
}

const productsInCart = async (req, res) => {
    try {
        const { cartId } = req.params

        const cart = await CartDao.getCartById(cartId)
        if (!cart) return res.status(404).send({ error: true, message: "Error de carrito" })

        const productsInCart = await cart.products

        res.status(200).send({ success: true, productsInCart: productsInCart })

    } catch (error) {
        logger.error('error desde el productsInCart')
        res.status(404).send({ success: false, data: undefined, message: "Error de carrito" })
    }

}

const cartById = async (req, res) => {
    try {
        const { id } = req.params

        const cart = await CartDao.getCartById(id)

        if (!cart) {
            return res.status(404).send({ success: false, data: undefined, message: "Error de carrito" })
        }

        res.status(200).send({ success: true, data: cart, message: "Carrito localizado" })

    } catch (error) {

        logger.error('error desde el cartById')
        res.status(404).send({ success: false, data: undefined, message: "Error de carrito" })
    }
}

const buyCart = async (req, res) => {
    try {

        const { id } = req.params
        const { email } = req.body

        const cart = await CartDao.getCartById(id)
        if (!cart) return res.status(404).send({ error: true, message: "Error de carrito" })

        const user = await UserModel.findOne({email: email})
        if (!user) return res.status(404).send({ error: true, message: "Error de usuario" }) 

        const cartInUser = user.orders.find(element => element._id == id)
        if (cartInUser) { 
            res.status(404).send({ error: true, message: "La compra del carrito ya ha sido realizada por el usuario" }) 
        }
        else {
            user.orders.push(cart)
            await UserModel.findByIdAndUpdate(user._id, user)
            const userUpdated = await UserModel.findOne(user._id)
            
            let subject = 'Nuevo pedido!'
            let mailTo = config.MAIL.USER
    
            let productsList = cart.products.map(({ title }) => (
                `
                <li>${title}</li>
                `
            )).join('')
    
            let html = `
                            <h3>Nuevo pedido!!</h3>
                            <p> Datos:</p>
                            <ul>
                                ${productsList}
                            </ul>
                        `
    
    
            await EMAIL_UTILS.sendEmail(mailTo, subject, html)
            res.status(200).send({ success: true, data: userUpdated, message: "Enviamos un mail al vendedor para que pueda despachar el pedido" })
        }



    } catch (error) {

        logger.error('error desde el cartById')
        res.status(404).send({ success: false, data: undefined, message: "Error de carrito" })
    }
}

export const CartController = { saveCart, updatedCartById, deleteCart, deleteProductFromCart, buyCart, productsInCart, cartById }