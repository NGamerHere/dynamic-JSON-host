import express,{Request,Response} from "express";
import api from "../models/Api.ts";

const HomeRoutes=express.Router();

HomeRoutes.get("/", (req: Request, res: Response) => {
    if (req.session.user) {
        res.render('home',{not:false,log:true,name:req.session.user.name});
    }
    res.render('home',{not:true,log:false});
});



HomeRoutes.get('/dashboard', async (req: Request, res: Response) => {
    if (req.session.user) {
        const router=await api.find({userId: req.session.user._id});

        res.render('dashboard',{name: req.session.user.name,router:router});
    } else {
        res.redirect('/login');
    }
});

export default HomeRoutes;