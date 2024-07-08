import mongoose, { Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";


const UserSchema=new Schema<IUser>(
    {
        name:{
            type:String,
            required:[true,"name is required"]
        },
        email:{
            type:String,
            unique:true,
            required:[true,"name is required"]
        },
        password:{
            type:String,
            required:[true,"password is required"]
        },
        role:{
            type:String,
            enum:["user","admin"],
            required:[true,"name is required"]
        }
    },
    {
        timestamps:true
    }
)

export const User=mongoose.model("user",UserSchema)