const nodemailer = require("nodemailer");
require("dotenv").config();

const sendEmail = async (email, subject, text) => {
    try {
     
        const transporter = nodemailer.createTransport({
          
            service: 'gmail',
            port: process.env.SMTP_PORT,
            auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD,
            },
        });

        await transporter.sendMail({
            from:process.env.EMAIL_FROM,
            to:email,
            subject: subject,
            text: text,
        });

        console.log("email sent sucessfully",text);
    } catch (error) {
        console.log(error, "email not sent");
        return false;
        // return (error.message,"something went wrong")
    }
};

module.exports = sendEmail;