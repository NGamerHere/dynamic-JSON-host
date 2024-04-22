import express,{Request,Response} from "express";
import user from "../models/User.ts";
import generateRandomKey from "../services/generateRandomKey.ts";
import MailService from "../services/mailService/MailService.ts";

const RegistrationRoute=express.Router();

RegistrationRoute.get('/registration', (req: Request, res: Response) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    }
    res.render('registration',{error:false});
})
RegistrationRoute.post('/registration',async (req:Request,res:Response)=> {
    if (req.session.user) {
        return res.redirect('/dashboard');
    }
    const username: string = req.body.username;
    const email: string = req.body.email;
    const password: string = req.body.password;
    const Email = await user.findOne({ email: email });
    const Username = await user.findOne({ username: username });
    if (Email) {
        return res.render('registration',{error:true,message:"Email is already exist"});
    }else if (Username) {
        return res.render('registration',{error:true,message:"Username is already exist"});
    }
    else {
        const key=generateRandomKey(16)
        const envkey:string = await Bun.password.hash(key, {
            algorithm: "bcrypt",
            cost: 4, // number between 4-31
        });
        const bcryptHash = await Bun.password.hash(password, {
            algorithm: "bcrypt",
            cost: 4, // number between 4-31
        });
        const newUser =await new user({
            username: username,
            email: email,
            password: bcryptHash,
            passKey: envkey
        });

        newUser.save().then(async (result: any) => {
            console.log("new user was added "+result.username);
            MailService(email,key);
            res.redirect('/login');
        }).catch((err: any) => {
            console.log(err);
            res.render('registration',{error:true,message:"Something went wrong"});
        });
    }

});


export default RegistrationRoute;