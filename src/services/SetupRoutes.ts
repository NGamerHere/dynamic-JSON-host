import user from "../models/User.ts";
import Api from "../models/Api.ts";

async function setUpRoutes(app) {
    try {
        const users = await user.find();

        for (const user of users) {
            const routes = await Api.find({ userId: user._id });

            for (const data of routes) {
                const routePath = `/${user.name}/${data.routeName}`;

                app.get(routePath, (req, res) => {
                    try {
                        res.json(data.routeData);
                    } catch (error) {
                        console.error("Error parsing route data:", error);
                        res.status(500).send("Error parsing route data");
                    }
                });
            }
        }

    } catch (error) {
        console.error("Error setting up routes:", error);
    }
}
export default setUpRoutes;