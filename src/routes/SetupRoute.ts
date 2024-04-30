import express, {Request, Response} from "express";
import user from "../models/User.ts";
import Api from "../models/Api.ts";
import api from "../models/Api.ts";
import routerSender from "../services/ApiService/routerSender.ts";

const SetupRoute = express.Router();

SetupRoute.get("/api/:username/:routeName", async (req: Request, res: Response) => {
    try {
        const username: string = req.params.username;
        const routeName: string = req.params.routeName;
        const key: string = req.query.key as string;

        const User = await user.findOne({ username: username });

        if (User && User.username === username) {
            const data = await Api.findOne({ userId: User._id, routePath: routeName });

            if (data) {

                if (data.accessType === "private") {
                    if (await Bun.password.verify(key, data.key)) {
                        return res.status(200).send(data.routeData);
                    } else {
                        if (key==undefined) {
                            return res.status(400).send(UserError("key was required"));
                        }
                        return res.status(401).send(UserError("key was wrong"));
                    }
                } else {
                    return res.status(200).send(data.routeData);
                }
            } else {
                return res.status(404).send(UserError('data not found'));
            }
        } else {
            return res.render('SomethingError', { message: "User not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
});

const UserError=(message:string)=>{
    return {
        message: message
    };
}

SetupRoute.get('/api/:username/',async (req:Request,res:Response)=>{
    const username:string=req.params.username;
    const key: string = req.query.key as string;
    const userData=await user.findOne({username: username});
    if (userData){
        const apiData=await api.find({userId: userData._id});
        if (apiData){
            if (await Bun.password.verify(key, userData.passKey)){
                res.send(routerSender(apiData));
            }else {
                return res.send(UserError("key was wrong or not found"))
            }
        }else {
            res.send(UserError('you have zero apis'));
        }
    }else {
        res.send(UserError('your account was not found'));
    }
})

export default SetupRoute;
