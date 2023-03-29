import { Schema } from "mongoose";

const ProductCollection = 'products'

const ProductSchema = new Schema(
    {
        title: { type: String, require: true },
        description: { type: String, require: true },
        code: { type: Number, require: true },
        price: { type: Number, require: true },
        thumbnail: { type: String, require: true },
        stock: { type: Number, require: true },
        timestamp: { type: String, require: true }
    },
)

export const ProductModel = { ProductCollection, ProductSchema }