import { Schema } from "mongoose";

const CartCollection = 'carts'

const CartSchema = new Schema(
    {
        timestamp: { type: String, require: true },
        products: [{ type: Schema.Types.ObjectId, ref: 'products' }]
    },
)

export const CartModel = { CartSchema, CartCollection }