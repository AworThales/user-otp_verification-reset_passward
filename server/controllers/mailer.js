import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import ENV from '../config.js';

// https://ethereal.email/create
let nodeConfig = {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, //true for 465, salse for other
    auth: {
    // TODO: replace `user` and `pass` values from <https://forwardemail.net>
    user: ENV.EMAIL,
    pass: ENV.PASSWORD
  }
}

const transporter = nodemailer.createTransport(nodeConfig);

const MailGenerator = new Mailgen({
    theme: "default",
    product: {
        name: "MailGen",
        link: "https://mailgen.js"
    }
})


/** POST REQUEst: http://localhost:8080/api/registerMail
 * @param: {
    "username": "thallo",
    usermail: "admin1234",
    "text": "",
    "subject": ""
}
 */
export const registerMail = async (req, res) =>{
    const { username, userEmail, text, subject } = req.body; // when we make post request we can pass values to this variables

    // email body
    var email = {
        body: {
            name: username,
            intro: text || "Welcome to our website we\'re very excited to have you on board.",
            outro: "Need help, or have question? Just reply to this email, we\'d love to help."
        }
    }

    var emailBody = MailGenerator.generate(email);

    const message = {
        from: ENV.EMAIL,
        to: userEmail,
        subject: subject || "Signup was successful...!",
        html: emailBody
    }

    // send mail
    transporter.sendMail(message)
        .then( () => {
            return res.status(200).send({ msg: "You should recieve an email from us."})
        })
        .catch (error => res.status(500).send({ error }))
}