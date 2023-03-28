import { UserModel } from "../models/index.js";
import { BCRYPT_VALIDATION, EMAIL_UTILS } from "../utils/index.js";
import logger from "../utils/loggers.js";


/* const login = ( req, email, password, done ) => {
    UserModel.findOne({ email: email }, (err, user) => {
        if (err) {
            console.log("Error in Login: " + err);
            return done(err);
        }
        if (!user) {
            console.log(user)
                console.log("User Not Found with email: " + email);
                return done(null, false);
            }
            if (!BCRYPT_VALIDATION.validatePassword(password, user)) {
                console.log("Invalid Password");
                return done(null, false); 
            }
            return done(null, user);
        });
} */

const login = async (email, password, done) => {
    try {

        if (!email || !password) return done(null, false, { message: "Password or user not valid user" })
        const user = await UserDao.getOne({ email: email })
        console.log(user);

        if (!user) {
            logger.warn(`Password or user not valid user`);
            return done(null, false, { message: "Password or user not valid user" })
        }

        if (BCRYPT_VALIDATION.validatePassword(password, user) != true) {
            logger.warn(`Password or user not valid pass`);
            return done(null, false, { message: "Password or user not valid user" })
        }

        const userResponse = {
            id: user._id,
            email: user.email,
            cart: user.cart,
            name: user.name,
            lastname: user.lastname,
            adress: user.adress,
            age: user.age,
            phone: user.phone
        };

        // res.send({ success: true, data: userResponse })
        return done(null, userResponse, { message: "login sucessful" })

    } catch (error) {
        // res.send({ success: false, message: "login fail" })
        logger.error(`error from middlewares/passportAuth - LocalStrategy`, error)
        return done(null, error, { message: "error catch" })
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
                // res.status(200).send({ success: true, data: newUser })
            }
        });
        
    } catch (error) {
        logger.error(`error from Register-Post`);
        // res.status(400).send({ success: false, message: "Error al registrarse" })
    }
}

export const AuthController = { login, register }
