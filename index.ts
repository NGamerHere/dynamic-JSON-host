import express from 'express';
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

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

const url=`mongodb+srv://${process.env.DBUSERNAME}:${process.env.DBPASSWORD}@cluster0.nl7thfs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
DBConnector(url);

app.use(session({
    secret: process.env.SESSIONKEY,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 60 * 60 * 24 * 7 * 1000, // 7 days
    },
}));



app.use(setUpRoutes);
app.use(LoginRoute);
app.use(RegistrationRoute);
app.use(LogoutRoute);
app.use(HomeRoutes);
app.use(ApiRouter);


app.use(handle404);


const options = {
    ca: fs.readFileSync('ca_bundle.crt'),
    cert: fs.readFileSync('certificate.crt'),
    key: fs.readFileSync('private.key')
};

// Create HTTPS server
https.createServer(options, app).listen(process.env.PORT, () => {
    console.log('HTTPS server running on port 3000 ' );
});
