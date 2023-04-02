/* import { UsersToValidateDao } from "../daos/index.js" */
import { UserToValidateModel, UserModel } from "../models/index.js"
import { EMAIL_UTILS } from "../utils/nodemailer.js"

const validate = async ( req, res ) => {
    try {
        const { codeRec } = req.body
        const foundUser = await UserToValidateModel.findOne({ code: codeRec })
        console.log(foundUser)
        if (!foundUser) {
            res.send({success: false, message: "Codigo incorrecto"});
        } else {
            let subject = 'Nuevo usuario creado'
            let mailTo = 'matias.dimascio@gmail.com'
            let html = `
            <h3>Nuevo registro de usuario</h3>
            <p> Datos:</p>
            <ul>
                <li> Nombre: ${foundUser.name}</li>
                <li> Apellido: ${foundUser.lastname}</li>
                <li> Email: ${foundUser.email}</li>
                <li> Teléfono: ${foundUser.phone}</li>
                <li> Edad: ${foundUser.age}</li>
                <li> Dirección: ${foundUser.address}</li>
                </ul>
                `
            await EMAIL_UTILS.sendEmail(mailTo, subject, html)
            const userToSave = {
                name: foundUser.name,
                lastname: foundUser.lastname,
                email: foundUser.email,
                password: foundUser.password,
                age: foundUser.age,
                address: foundUser.address,
                phone: foundUser.phone,
            }
            await UserModel.create(userToSave)
            await UserToValidateModel.findByIdAndDelete(foundUser._id)
            res.send({success: true, message: "exito"})
        }      
    } catch (error) {
        console.log(error)
    }
}

export const UserToValidateController = { validate }