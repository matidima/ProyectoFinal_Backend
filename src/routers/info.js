import { Router } from "express";
import { INFO } from "../../src/utils/info.js"
import { IncorrectRoute } from "../middlewares/index.js";

const router = Router()

router.get('/', (req, res) => {
    const data = INFO
    /* console.log(data) */
    res.render('info.hbs', { data })
})

router.get('/compresion', (req, res) => {
    const data = INFO
    res.render('info.hbs', { data })
})

router.get('*', IncorrectRoute.errorRoutes)

export { router as InfoRouter }