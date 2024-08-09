import express,{type Request,type Response,type Express, response} from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import https from "https";
import fs from "fs";
import DBConnector from "./src/services/connection.ts";
import handle404 from "./src/services/Notfound.ts";
import LoginRoute from "./src/routes/LoginRoute.ts";
import RegistrationRoute from "./src/routes/RegistrationRoute.ts";
import LogoutRoute from "./src/routes/LogoutRoute.ts";
import HomeRoutes from "./src/routes/HomeRoutes.ts";
import setUpRoutes from "./src/routes/SetupRoute.ts";
import ApiRouter from "./src/routes/ApiRouter.ts";
require('dotenv').config();

const app: Express = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const url=`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.nl7thfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
DBConnector(url);


const secret:string=process.env.SESSIONKEY || "dynamicJSONHOST";

app.use(session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 24 * 7 * 1000,
    },
}));



app.use(setUpRoutes);
app.use(LoginRoute);
app.use(RegistrationRoute);
app.use(LogoutRoute);
app.use(HomeRoutes);
app.use(ApiRouter);


app.use(handle404);

app.listen(process.env.PORT , function () {
    console.log(`HTTPS server running on port  `+process.env.PORT );
})
