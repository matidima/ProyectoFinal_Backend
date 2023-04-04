import { Router } from "express";
import { ProductController } from "../controllers/index.js";

const router = Router();

router.post('/', ProductController.importProducts)

router.get('/', ProductController.getAll)

router.post('/create', ProductController.createProduct)

router.get("/:id", ProductController.getById)

router.delete("/:id", ProductController.deleteProduct)

export {router as ProductRouter}