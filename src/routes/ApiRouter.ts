import express from "express";
import Api from "../models/Api.ts";
import APIkeys from "../models/APIkeys.ts";
import generateRandomKey from "../services/generateRandomKey.ts";
import MailServiceReg from "../services/mailService/NewApiReg.ts";

const ApiRouter = express.Router();
ApiRouter.get("/addApi", async (req, res) => {
    if (req.session.user) {
        res.render('addAPI');
    } else {
        return res.redirect('/login');
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

            const key = data.accessType === "private" ? generateRandomKey(16) : null;

            const api = new Api({
                userId: req.session.user._id,
                routeName: data.routerName,
                routeData: data.routeData,
                routePath: data.routePath,
                routeDescription: data.routeDescription,
                accessType: data.accessType,
                key: key,
            });

            await api.save();

            if (data.accessType === "private") {
                MailServiceReg(req.session.user.email, key, data.routerName, data.routePath);
            }

            res.send("Data saved");
        } catch (error) {
            console.error("Error saving data:", error);
            res.status(500).send(`Error saving data: ${error.message}`);
        }
    } else {
        return res.redirect('/login');
    }
});
export default ApiRouter;
