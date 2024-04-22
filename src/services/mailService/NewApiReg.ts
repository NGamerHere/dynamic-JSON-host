const nodemailer = require('nodemailer');

function MailService(email:string,key:string,ApiName:string,ApiRoute:string){
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
        html:"<div>"+
            "<h1>add the new api</h1>"+
            "<h2>Api Name : "+ApiName+"</h2>"+
            "<h2>Api Route : "+ApiRoute+"</h2>"+
            "<h2>Api Key : "+key+"</h2>"
            +"</div>"
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


