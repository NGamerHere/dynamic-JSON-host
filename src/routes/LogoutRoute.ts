import express,{type Request,type Response} from "express";

const LogoutRoute=express.Router();

LogoutRoute.get('/logout', (req: Request, res: Response) => {
    req.session.destroy((err: any) => {
        if (err) {
            console.error(err);
        }
        res.redirect('/');
    });
})

export default LogoutRoute;