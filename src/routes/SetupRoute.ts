import express, { Request, Response } from "express";
import user from "../models/User.ts";
import Api from "../models/Api.ts";
import APIkeys from "../models/APIkeys.ts";

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
                const apikey = await APIkeys.findOne({ userId: User._id, ApiID: data._id });

                if (data.accessType === "private") {
                    if (apikey && apikey.key === key) {
                        return res.status(200).send(data.routeData);
                    } else {
                        return res.status(401).send("Unauthorized");
                    }
                } else {
                    return res.status(200).send(data.routeData);
                }
            } else {
                return res.status(404).send("Data not found");
            }
        } else {
            return res.render('SomethingError', { message: "User not found" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send("Internal Server Error");
    }
});

export default SetupRoute;
