import express from "express";
import Api from "../models/Api.ts";
import generateRandomKey from "../services/generateRandomKey.ts";
import MailServiceReg from "../services/mailService/NewApiReg.ts";
import editApiRouteSender from "../services/ApiService/editApiRouteSender.ts";

const ApiRouter = express.Router();
ApiRouter.get("/addApi", (req, res) => {
    if (req.session.user) {
        res.render('addAPI');
    } else {
        return res.redirect('/login');
    }
});
ApiRouter.get("/editApi", async (req, res) => {
    const routeName = req.query.key?.toString(); // Convert routeName to string

    if (req.session.user) {
        const data = await Api.findOne({ userId: req.session.user._id, routeName: routeName });
        if (data && data.accessType === 'public') {
            return res.render('editApi', { editData: 'two', data: editApiRouteSender(data) });
        } else {
            return res.render('editApi', { editData: 'two', data: {} });
        }

    } else {
        res.redirect('/login');
    }
})
ApiRouter.post("/editApi",async (req,res)=>{
   const routeName=req.body.routeName;
   const routeData=req.body.routeData;
    if (req.session.user) {
        let data = await Api.findOne({userId: req.session.user._id, routeName: routeName});
        if (data) {
            data.routeData = JSON.parse(routeData.trim());
           await data.save();
           console.log(req.session.user.username + " edited his API named "+routeName);
           res.redirect('/dashboard');
        } 
        else {
            res.redirect('/login');


        }
    }
});



ApiRouter.delete("/api/:routeName", async (req, res) => {
    const routeName:string = req.params.routeName;
    if (req.session.user) {
        const data = await Api.findOne({userId: req.session.user._id, routeName: routeName});
        if (data) {
            await Api.deleteOne({userId: req.session.user._id, routeName: routeName});
            res.send("Data deleted");
        } else {
            res.status(400).send("Data not found");
        }
    }else {
        return res.redirect('/login');
    }
});

ApiRouter.post("/addApi", async (req, res) => {
    if (req.session.user) {
        try {
            if (!req.body.routerName || !req.body.routeData) {
                return res.status(400).send("Invalid data");
            }

            const data = req.body;
            const existingApi = await Api.findOne({
                userId: req.session.user._id,
                routeName: data.routerName,
                routePath: data.routePath,
            });

            if (existingApi) {
                return res.status(400).json({ message: "An API with the same route name and path already exists" });
            }
            let key="1234";
            let envKey;
            if (data.accessType === "private"){
                key=generateRandomKey(16);
                envKey=await Bun.password.hash(key,{
                    algorithm: "bcrypt",
                    cost: 4
                });
            }
            const api = new Api({
                userId: req.session.user._id,
                routeName: data.routerName,
                routeData: data.routeData,
                routePath: data.routePath,
                routeDescription: data.routeDescription,
                accessType: data.accessType,
                key: envKey,
            });

            await api.save();
            console.log(req.session.user.username + " added the new api  named + "+ data.routeName);
            

            if (data.accessType === "private") {
                MailServiceReg(req.session.user.email, key, data.routerName, data.routePath);
            }

            res.send("Data saved");
        } catch (error:any) {
            console.error("Error saving data:", error);
            res.status(500).send(`Error saving data: ${error.message}`);
        }
    } else {
        return res.redirect('/login');
    }
});
export default ApiRouter;
