import { IUser } from "../interfaces/user.interface";
import { Token } from "../middlewares/auth.middleware";
import { UserService } from "../services/user.service";
import { Request,Response } from "express";
const user_service=new UserService()

export class UserController{
    async signup(req:Request,res:Response){
        try {
            let userdata:IUser=req.body;
            const responsedata=await user_service.signup(userdata);
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async login(req:Request,res:Response){
        try {
            let userdata:IUser=req.body;
            const responsedata=await user_service.login(userdata);
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async updateUser(req:Request,res:Response){
        try {

            const userToken:Token=req.user;
            let userdata:IUser=req.body;
            const responsedata=await user_service.updateUser(userToken.userId,userdata);
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async deleteUser(req:Request,res:Response){
        try {
            const userToken:Token=req.user;
            const responsedata=await user_service.deleteUser(userToken.userId);
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async getParticularUser(req:Request,res:Response){
        try {
            const userToken:Token=req.user;
            const responsedata=await user_service.getParticularUser(userToken.userId);
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async getUser(req:Request,res:Response){
        try {
            const responsedata=await user_service.getUsers();
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content,length:responsedata.length})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async getUserById(req:Request,res:Response){
        try {
            const userId=req.params.id;
            const responsedata=await user_service.getUserById(userId);
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async updateUserByAdmin(req:Request,res:Response){
        try {

            const userId=req.params.id;
            let userdata:IUser=req.body;
            const responsedata=await user_service.updateUserByAdmin(userId,userdata);
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async deleteUserByAdmin(req:Request,res:Response){
        try {
            const userId=req.params.id;
            const responsedata=await user_service.deleteUserByAdmin(userId);
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async getUserAvgScore(req:Request,res:Response){
        try {
            const userId=req.user.userId;
            const responsedata=await user_service.getUserAvgScore(userId);
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
    async getExams(req:Request,res:Response){
        try {
            const responsedata=await user_service.getExams();
            if(responsedata.status){
                return res.json({status:responsedata.status,content:responsedata.content,length:responsedata.length})
            }
            else{
                return res.json({status:responsedata.status,content:responsedata.content})
            }
            
        } catch (error:any) {
            return res.json({status:false,content:error.message})   
        }
    }
}