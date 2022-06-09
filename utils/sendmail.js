const nodemailer = require("nodemailer");
const fs=require('fs')
const path=require('path')
const handlebars=require('handlebars')
// let __dirname=' C:\Users\sreepriya\Desktop\Fullstackdeveloper\RegisterandLogin\backend'
const sendEmail = async (email, subject,payload,template) => {
    try {
         const transporter = nodemailer.createTransport({
             host: process.env.HOST,
             service: process.env.SERVICE,
             port: 25 ,
             secure: false,
             auth: {
                 user: process.env.USER,
                 pass: process.env.PASS,
             },
             tls: {
                 rejectUnauthorized: false
             }
         });

       
        const source = fs.readFileSync(path.join(__dirname, template), "utf8"); 
        const compiledTemplate = handlebars.compile(source);
        await transporter.sendMail({
            from: process.env.USER,
            to:  email,
            subject: subject,
            html: compiledTemplate(payload),
        });

        console.log("email sent sucessfully");
       
   

    } catch (error) {
        console.log(error, "email not sent");
    }
};

module.exports = sendEmail;