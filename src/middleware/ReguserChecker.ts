import type { NextFunction, Request, Response } from "express"

const checkUser=(req:Request,res:Response,next:NextFunction)=>{
    if((req.session as any).user){
         next();
    }else{
        res.redirect('/dashboard');
    }
}
export default checkUser;