import express,{Request,Response} from "express";
import user from "../models/User.ts";
import Api from "../models/Api.ts";

const SetupRoute=express.Router();

SetupRoute.get("/api/:username/:routeName", async (req:Request, res:Response) => {
    const username:string = req.params.username;
    const routeName:string = req.params.routeName;
    const key:string = req.query.key as string;


    const User = await user.findOne({ username: username });
    if(User && User.username === username){
        const data = await Api.findOne({ userId: User._id, routeName: routeName });
        if (data) {
            if (User.passKey != key) {
                return res.status(401).send("Unauthorized");
            }
            else {
                res.status(200).send(data.routeData);
            }
        }

        else {
            res.status(404).send("Data not found");
        }
    }else {
        return res.render('SomethingError',{message:"User not found"});
    }

});

export default SetupRoute;
