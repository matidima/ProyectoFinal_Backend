import { Router } from "express";
import { UserToValidateController } from "../controllers/index.js";

const router = Router();

router.post('/', UserToValidateController.validate)

export {router as UserToValidateRouter}