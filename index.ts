import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import DBConnector from "./src/services/connection.ts";
import user from "./src/models/User.ts";
import handle404 from "./src/services/Notfound.ts";
import LoginRoute from "./src/routes/LoginRoute.ts";
import RegistrationRoute from "./src/routes/RegistrationRoute.ts";
import LogoutRoute from "./src/routes/LogoutRoute.ts";
import HomeRoutes from "./src/routes/HomeRoutes.ts";
import Api from "./src/models/Api.ts";

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');


DBConnector("mongodb://127.0.0.1:27017/tester");




app.use(session({
    secret: 'hello there',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        //the user was login in for 7 days
        maxAge: 60 * 60 * 24 * 7 * 1000,
    },
}));

app.use(LoginRoute);
app.use(RegistrationRoute);
app.use(LogoutRoute);
app.use(HomeRoutes);

app.get("/api/:username", async (req, res) => {
    const username:string = req.params.username;
    if (req.session.user) {
        const User = await user.findOne({ name: username });

        if(User && User.name === username && username === req.session.user.name){
            res.render('dashboard',{name:User.name});
        }else {
            return res.render('SomethingError',{message:"User not found"});
        }
    }else {
        return res.redirect('/login');
    }


});


app.get("/addApi", async (req, res) => {
    if (req.session.user) {
        res.render('addAPI');
    } else {
        return res.redirect('/login');
    }
});

app.post("/addApi", async (req, res) => {
    if (req.session.user) {
        try {
            if (!req.body.routerName || !req.body.routeData) {
                return res.status(400).send("Invalid data");
            }
            const data = req.body;
            const ds = new Api({
                userId: req.session.user._id,
                routeName: data.routerName,
                routeData: data.routeData
            });
            await ds.save();
            res.send("Data saved");
        } catch (error) {
            console.error("Error saving data:", error);
            res.status(500).send("Error saving data");
        }
    } else {
        return res.redirect('/login');
    }
});

app.use(handle404);


app.listen(3000, async () => {
    console.log('Server is running on port 3000');
});
