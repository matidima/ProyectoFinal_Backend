import { ProductsMongo } from "./products.js";
import { CartsMongo } from "./cart.js";
import { UsersMongo } from "./user.js";

const ProductDao = new ProductsMongo()
const CartDao = new CartsMongo()
const UserDao = new UsersMongo()

export { ProductDao, CartDao, UserDao }