import express, { Request, Response } from 'express';
import bodyParser from "body-parser";
import session from "express-session";
import DBConnector from "./src/services/connection.ts";
import handle404 from "./src/services/Notfound.ts";
import LoginRoute from "./src/routes/LoginRoute.ts";
import RegistrationRoute from "./src/routes/RegistrationRoute.ts";
import LogoutRoute from "./src/routes/LogoutRoute.ts";
import HomeRoutes from "./src/routes/HomeRoutes.ts";
import setUpRoutes from "./src/routes/SetupRoute.ts";
import ApiRouter from "./src/routes/ApiRouter.ts";

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


app.use(setUpRoutes);
app.use(LoginRoute);
app.use(RegistrationRoute);
app.use(LogoutRoute);
app.use(HomeRoutes);
app.use(ApiRouter);

app.get('/test', (req: Request, res: Response) => {
    res.render('tester');
});

app.use(handle404);






app.listen(3000, async () => {
    console.log('Server is running on port 3000');
});
