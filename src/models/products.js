import { Schema } from "mongoose";

const ProductCollection = 'products'

const ProductSchema = new Schema(
    {
        title: String,
        description: String,
        code: Number,
        price: Number,
        thumbnail: String,
        stock: Number,
        timestamp: String,
    },
)

export const ProductModel = { ProductCollection, ProductSchema }