import express,{Request,Response} from "express";
import user from "../models/User.ts";
import Api from "../models/Api.ts";
import APIkeys from "../models/APIkeys.ts";

const SetupRoute=express.Router();

SetupRoute.get("/api/:username/:routeName", async (req:Request, res:Response) => {
    const username:string = req.params.username;
    const routeName:string = req.params.routeName;
    const key:string = req.query.key as string;


    const User = await user.findOne({ username: username });
    if(User && User.username === username){

        const data = await Api.findOne({ userId: User._id, routePath: routeName });
        const apiKey = await APIkeys.findOne({ ApiID: data._id });
        const apikey = apiKey.key;
        if (data) {
            if (data.accessType === "private") {

                if (apikey===key) {
                    return  res.status(200).send(data.routeData);

                }
                else {
                    return res.status(401).send("Unauthorized");
                }
            }else {
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