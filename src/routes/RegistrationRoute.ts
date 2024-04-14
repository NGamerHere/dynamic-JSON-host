import express,{Request,Response} from "express";
import user from "../models/User.ts";
import generateRandomKey from "../services/generateRandomKey.ts";

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
        const key=generateRandomKey(16);
        const newUser =await new user({
            username: username,
            email: email,
            password: password,
            passKey: key
        });
        newUser.save().then((result: any) => {
            console.log("new user was added "+result.name);
            res.redirect('/login');
        }).catch((err: any) => {
            console.log(err);
            res.render('registration',{error:true,message:"Something went wrong"});
        });
    }

});

export default RegistrationRoute;