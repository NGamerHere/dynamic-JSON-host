import express,{type Request,type Response} from "express";
import api from "../models/Api.ts";
import user from "../models/User.ts";

const HomeRoutes=express.Router();

HomeRoutes.get("/", async (req: Request, res: Response) => {
    if (req.session.user) {
        const User = await user.findOne({ _id: req.session.user._id });
        if (User) {
            res.render('home',{not:false,log:true,name: User.username});
        } else {
            res.render('home',{not:false,log:true,name: null});
        }
    }
    res.render('home',{not:true,log:false});
});



HomeRoutes.get('/dashboard', async (req: Request, res: Response) => {
    if (req.session.user) {
        const router=await api.find({userId: req.session.user._id});
        const User = await user.findOne({ _id: req.session.user._id });
        if (!User) {
            return res.redirect('/login');
        }
        res.render('dashboard',{name: req.session.user.username,router:router});
    } else {
        res.redirect('/login');
    }
});

export default HomeRoutes;