import { UserModel } from "../models/index.js";
import { BCRYPT_VALIDATION, EMAIL_UTILS } from "../utils/index.js";
import logger from "../utils/loggers.js";

const login = ( req, email, password, done ) => {
    try {
        UserModel.findOne({ email: email }, (err, user) => {
            if (err) {
                console.log("Error in Login: " + err);
                return done(err, { message: "Password or user not valid user" });
            }
            if (!user) {
                    console.log("User Not Found with email: " + email);
                    return done(null, false, { message: "Password or user not valid user" });
                }
            if (!BCRYPT_VALIDATION.validatePassword(password, user)) {
                    console.log("Invalid Password");
                    return done(null, false, { message: "Password or user not valid user" }); 
                }
            return done(null, user, { message: "Inicio de sesion exitoso" });
            });
    } catch (error) {
        logger.error(`error from Login-Post`);
    }
}

const register = async (req, email, password, done) => {
    try {
        const { name, lastname, age, address, phone } = req.body
        UserModel.findOne({ email: email }, async function (err, user) {
            if (err) {
                console.log("Error in SignUp: " + err);
                return done(err);
            }
            if (user) {
                console.log("User already exists");
                return done(null, false);
            } else {
                const newUser = new UserModel();
                const passwordString = password.toString();
                newUser.name = name;
                newUser.lastname = lastname;
                newUser.email = email;
                newUser.password = BCRYPT_VALIDATION.hashPassword(passwordString);
                newUser.age = age;
                newUser.address = address;
                newUser.phone = phone;
                newUser.save().then(datos => done(null, datos)).catch(null, false)
                let subject = 'Nuevo usuario creado'
                let mailTo = 'matias.dimascio@gmail.com'
                let html = `
                            <h3>Nuevo registro de usuario</h3>
                            <p> Datos:</p>
                            <ul>
                            <li> Nombre: ${name}</li>
                            <li> Apellido: ${lastname}</li>
                            <li> Email: ${email}</li>
                            <li> Teléfono: ${phone}</li>
                            <li> Edad: ${age}</li>
                            <li> Dirección: ${address}</li>
                            </ul>
                `
                await EMAIL_UTILS.sendEmail(mailTo, subject, html)
            }
        });
        
    } catch (error) {
        logger.error(`error from Register-Post`);
    }
}

export const AuthController = { login, register }