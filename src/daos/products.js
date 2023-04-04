import { mongoDBContainer } from "../containers/mongoDBContainer.js";
import { ProductModel } from "../models/index.js";

export class ProductsMongo extends mongoDBContainer {
    static getInstance() {
        return new ProductsMongo()
    }
    constructor() {
        if (typeof ProductsMongo.instance === 'object') {
            return ProductsMongo.instance
        }
        super({
            name: ProductModel.ProductCollection,
            schema: ProductModel.ProductSchema,
        })
        ProductsMongo.instance = this
        return this
    }

    async insertProducts(elements) {
        try {
            return await this.model.insertMany(elements)
        } catch (error) {
            logger.error(`error in saveMessage-MessagesMongo - Error: `, error)
        }
    }
}