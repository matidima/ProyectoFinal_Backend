import { Schema } from "mongoose";

const CartCollection = 'carts'

const CartSchema = new Schema(
    {
        timestamp: { type: String, require: true },
        products: [ { _id: {type: Schema.Types.ObjectId, ref: 'carts' }, cantidad: { type: Number } } ]
    },
)

export const CartModel = { CartSchema, CartCollection }