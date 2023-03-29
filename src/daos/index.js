import { ProductsMongo } from "./products.js";
import { CartsMongo } from "./cart.js";
import { ChatsMongo } from "./chat.js";
import { MessagesMongo } from "./message.js";

const ProductDao = ProductsMongo.getInstance()
const CartDao = CartsMongo.getInstance()
const ChatDao = ChatsMongo.getInstance()
const MessageDao = MessagesMongo.getInstance()

export { ProductDao, CartDao, ChatDao, MessageDao }