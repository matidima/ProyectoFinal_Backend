const errorRoutes = async (req, res, next) => {
    try {
        console.log('Ruta inexistente')
        res.redirect('/')
        next()
    } catch (error) {
        console.log(`error with route: ` + error)
    }
}

export const IncorrectRoute = { errorRoutes }