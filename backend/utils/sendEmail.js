const nodemailer = require('nodemailer')

const sendEmail = async(options) => {

     const transporter = nodemailer.createTransport({
          host: 'smtp-mail.outlook.com',
          port: '587',
          auth: {
            user: 'piyusharmap@gmail.com',
            pass: 'piyush_sharma2108'
          }
     });

     var mailOptions = {
          from: 'piyusharmap@gmail.com',
          to: options.email,
          subject: options.subject,
          text: options.message
     };

     await transporter.sendMail(mailOptions)
}

module.exports = sendEmail