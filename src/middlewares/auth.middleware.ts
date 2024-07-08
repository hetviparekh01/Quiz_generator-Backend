import config from "config";
import { Request,Response ,NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { ObjectId } from "mongoose";

export interface Token{
    userId:ObjectId,
    role:string
}
declare module "express-serve-static-core"{
    interface Request{
        user:Token
    }
}
export const jwtTokenVerify=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(500).json({status:false,content:"User is not LoggedIn"})
    }
    try {
        const decoded:JwtPayload=jwt.verify(token,config.get("secret_key")) as JwtPayload
        if(!decoded){
            throw new Error("invalid user")
        }
        req.user=decoded as Token
        next();
    } catch (error:any) {
        return  res.status(500).json({status:false,content:error.message})
    }
}