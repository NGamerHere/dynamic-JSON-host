const nodemailer = require('nodemailer');

function MailService(email: string, key: string) {
    // Create a transporter object with your email service provider's configuration
    const transporter = nodemailer.createTransport({
        host: 'smtp.privateemail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAILADDRESS,
            pass: process.env.PASSWORDEMAIL
        }
    });

    const mailOptions = {
        from: "admin@hostyourapi.click",
        to: email,
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<div>" +
            "<h1>Thank you for registering</h1>" +
            "<h2>welcome to dynamic API</h2>" + "<p>here is your master key to access the api " + key + "<p>" + "</div>"
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error occurred:', error.message);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

export default MailService;