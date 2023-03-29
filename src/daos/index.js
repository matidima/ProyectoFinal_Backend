import { ProductsMongo } from "./products.js";
import { CartsMongo } from "./cart.js";
import { UsersMongo } from "./user.js";
import { ChatsMongo } from "./chat.js";
import { MessagesMongo } from "./message.js";

const ProductDao = ProductsMongo.getInstance()
const CartDao = CartsMongo.getInstance()
const UserDao = UsersMongo.getInstance()
const ChatDao = ChatsMongo.getInstance()
const MessageDao = MessagesMongo.getInstance()

/* const ProductDao = new ProductsMongo()
const CartDao = new CartsMongo()
const UserDao = new UsersMongo() */

export { ProductDao, CartDao, UserDao, ChatDao, MessageDao }