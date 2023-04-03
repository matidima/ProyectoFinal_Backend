import { Router } from "express";
import { OrderController } from "../controllers/index.js";

const router = Router();

router.post('/', OrderController.getOrders)

export {router as OrderRouter}