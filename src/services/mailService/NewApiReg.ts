import mailgun from "mailgun-js/lib/mailgun";

function MailServiceReg(email:string,key:string,ApiName:string,ApiRoute:string){
    const mg = mailgun({
        apiKey: process.env.APISENDERKEY,
        domain: process.env.APIDOMAIN
    });

// Define the email data
    const mailOptions = {
        from: "codingdatta@gmail.com",
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

// Send the email
    mg.messages().send(mailOptions, (error, body) => {
        if (error) {
            console.log(error);
            return;
        }
        console.log(body);
    });
}
export default MailServiceReg;