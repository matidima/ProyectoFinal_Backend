import { createTransport } from 'nodemailer'
import { config } from '../config/config.js';

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: config.MAIL.USER,
        pass: config.MAIL.PASS,
    }
});

const sendEmail = async (mailTo, subject, html) => {
    try {
        const mailOptions = {
            from: "Servidor de Node",
            to: mailTo,
            subject: subject,
            html: html,
        }
        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch (error) {
        console.log('error from sendEmail: ' + error)
    }
}

export const EMAIL_UTILS = { sendEmail }