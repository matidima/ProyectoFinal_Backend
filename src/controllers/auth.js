/* import { UsersToValidateDao } from "../daos/index.js"; */
import { UserModel, UserToValidateModel } from "../models/index.js";
import { BCRYPT_VALIDATION, EMAIL_UTILS, EMAIL_VALIDATION } from "../utils/index.js";
import logger from "../utils/loggers.js";

const login = async ( req, email, password, done ) => {
    try {
        UserModel.findOne({ email: email }, async function (err, user) {
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

                let codigo = EMAIL_VALIDATION.randomNumbers()
                                           
                const passwordString = password.toString();
                const UserToValidate = new UserToValidateModel()
                UserToValidate.name = name,
                UserToValidate.lastname = lastname,
                UserToValidate.email = email,
                UserToValidate.password = BCRYPT_VALIDATION.hashPassword(passwordString),
                UserToValidate.age = age,
                UserToValidate.address = address,
                UserToValidate.phone = phone,
                UserToValidate.code = codigo,
                UserToValidate.save().then(datos => done(null, datos)).catch(null, false)

                let subjectValidation = 'Validar email'
                let htmlValidation = `
                <h3>Necesitamos validar to email ${name}</h3>
                <p> Tu codigo para validarlo: ${codigo}. No lo compartas con nadie. </p>
                `
                await EMAIL_UTILS.sendEmail(email, subjectValidation, htmlValidation)
                
            }
        });
        
    } catch (error) {
        logger.error(`error from Register-Post`);
    }
}

export const AuthController = { login, register }