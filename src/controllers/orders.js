import { UserModel } from "../models/index.js"

const getOrders = async ( req, res ) => {
    try {
        const { email } = req.body
        const foundUser = await UserModel.findOne({ email: email })
        console.log(foundUser)
        if (!foundUser) {
            res.send({success: false, message: "Usuario incorrecto"});
        } else {
            const orders = foundUser.orders
            console.log(orders)
            
            res.send({success: true, data: orders, message: "exito"})
        }      
    } catch (error) {
        console.log(error)
    }
}

export const OrderController = { getOrders }