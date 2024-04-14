import express,{Request,Response} from "express";
import user from "../models/User.ts";
import Api from "../models/Api.ts";

const SetupRoute=express.Router();

SetupRoute.get("/api/:username/:routeName", async (req, res) => {
    const username:string = req.params.username;
    const routeName:string = req.params.routeName;

    const User = await user.findOne({ name: username });
    if(User && User.name === username){
        const data = await Api.findOne({ userId: User._id, routeName: routeName });
        if (data) {
            res.json(data.routeData);
        } else {
            res.status(404).send("Data not found");
        }
    }else {
        return res.render('SomethingError',{message:"User not found"});
    }

});

export default SetupRoute;
