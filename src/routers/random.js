import { fork } from 'child_process'
import { Router } from "express"
import { IncorrectRoute } from "../middlewares/index.js";

const router = Router()

router.get('/', (req, res) => {
    const cant = req.query.cant || 100000000
    const subProcess = fork('./src/utils/random-numbers.js')
    subProcess.send(cant)

    subProcess.on('message', async (data) => {
        const dataArray = Object.entries(data)
        res.render('random.hbs', { dataArray })
    })
})

router.get('*', IncorrectRoute.errorRoutes)

export { router as RandomRouter }