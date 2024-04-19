import mailgun from "mailgun-js/lib/mailgun";

function MailServiceReg(email:string,key:string){
    const mg = mailgun({
        apiKey: process.env.APISENDERKEY, // Replace with your API key
        domain: process.env.APIDOMAIN // Replace with your sandbox domain
    });

// Define the email data
    const mailOptions = {
        from: "codingdatta@gmail.com",
        to: email,
        subject: "Hello",
        text: "Testing some Mailgun awesomeness!",
        html: "<div>" +
            "<h1>Thank you for registering</h1>" +
            "<h2>welcome to dynamic API</h2>" +  "<p>here is your private key to access the api"+key+"<p>"+"</div>"
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