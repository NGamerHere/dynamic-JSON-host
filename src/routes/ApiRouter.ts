import express, { Request, Response } from "express";
import user from "../models/User.ts";
import Api from "../models/Api.ts"; // Check this import
import APIkeys from "../models/APIkeys.ts";

const SetupRoute = express.Router();

SetupRoute.get("/api/:username/:routeName", async (req: Request, res: Response) => {
    const username: string = req.params.username;
    const routeName: string = req.params.routeName;
    const key: string = req.query.key as string;

    const User = await user.findOne({ username: username });
    if (User && User.username === username) {
        console.log(Api); // Debugging: Log imported Api model
        const data = await Api.findOne({ userId: User._id, routePath: routeName });

        if (data && data.accessType === "private") {
            const apiKey = await APIkeys.findOne({ ApiID: data._id });

            if (apiKey && apiKey.key === key) {
                res.status(200).send(data.routeData);
            } else {
                return res.status(401).send("Unauthorized");
            }
        } else if (data && data.accessType === "public") {
            res.status(200).send(data.routeData);
        } else {
            res.status(404).send("Data not found");
        }
    } else {
        return res.render('SomethingError', { message: "User not found" });
    }
});

export default SetupRoute;
