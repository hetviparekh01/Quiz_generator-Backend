import config from "config";
import { IUser } from "../interfaces/user.interface";
import { User } from "../models/user.model";
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken"
import mongoose, { ObjectId,Schema } from "mongoose";
import { Exam } from "../models/exam.model";

export class UserService {
    async signup(userdata: IUser) {
        try {
            const hashedpassword = await bcrypt.hash(userdata.password, 10)
            userdata.password = hashedpassword
            const responsedata = await User.create(userdata)
            if (responsedata) {
                return { status: true, content: "user sucessfully signed up" }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async login(userdata: IUser) {
        try {
            const user = await User.findOne({ email: userdata.email })
            if (!user) {
                throw new Error("User not Found")
            }
            const isValidate = await bcrypt.compare(userdata.password, user.password)
            if (!isValidate) {
                throw new Error("Invalid Credentials")
            }
            const payload: JwtPayload = {
                userId: user._id,
                role: user.role
            }
            const secret_key = config.get("secret_key") || "SECRETKEY"
            const token = jwt.sign(payload, secret_key as string, { expiresIn: "24h" })
            const responsedata = {
                message: "user successfully logged in",
                AccessToken: token,
                role: user.role,
                name: user.name,
            }
            if (responsedata) {
                return { status: true, content: responsedata }
            }
            else {
                throw new Error("Error in user logged in")
            }
        } catch (error: any) {
            return { status: false, content: error.message }
        }
    }
    async updateUser(userId: ObjectId, userdata: IUser) {
        try {
            if (userdata.password) {
                const hashedpassword = await bcrypt.hash(userdata.password, 10)
                userdata.password = hashedpassword
            }
            const responsedata = await User.findByIdAndUpdate(userId, userdata)
            if (responsedata) {
                return { status: true, content: "user sucessfully  updated" }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async deleteUser(userId: ObjectId) {
        try {
            const responsedata = await User.findByIdAndDelete(userId)
            if (responsedata) {
                return { status: true, content: "user sucessfully  deleted" }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async getParticularUser(userId: ObjectId) {
        try {
            const responsedata = await User.findById(userId)
            if (responsedata) {
                return { status: true, content: responsedata }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async getUsers() {
        try {
            const responsedata = await User.find({})
            if (responsedata) {
                return { status: true, content: responsedata,length:responsedata.length }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async getUserById(userId: string) {
        try {
            const responsedata = await User.findById(userId)
            if (responsedata) {
                return { status: true, content: responsedata }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async updateUserByAdmin(userId: string, userdata: IUser) {
        try {
            if (userdata.password) {
                const hashedpassword = await bcrypt.hash(userdata.password, 10)
                userdata.password = hashedpassword
            }
            const responsedata = await User.findByIdAndUpdate(userId, userdata)
            if (responsedata) {
                return { status: true, content: "user sucessfully  updated" }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async deleteUserByAdmin(userId: string) {
        try {
            const responsedata = await User.findByIdAndDelete(userId)
            if (responsedata) {
                return { status: true, content: "user sucessfully  deleted" }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async getUserAvgScore(userId:ObjectId) {
        try {
            const newUserId=userId.toString();
            const responsedata = await Exam.aggregate([
                {
                    $group: {
                        _id: "$userId",
                        averageScore: { $avg: "$score" },
                        exams: {
                            $push: {
                                _id: "$_id",
                                updatedAt: "$updatedAt",
                                questions: "$questions"
                            }
                        }
                    }
                },
                {
                    $lookup: {
                        from: "users",
                        localField: "_id",
                        foreignField: "_id",
                        as: "user"
                    }
                },
                {
                    $unwind: "$user"
                },
                {
                    $project: {
                        _id: 0,
                        userId: "$_id",
                        userName: "$user.name",
                        userEmail: "$user.email",
                        averageScore: 1,
                        exams: 1
                    }
                },
                {
                    $match: {
                        userId: new mongoose.Types.ObjectId(newUserId)
                    }
                }
            ])
            if (responsedata) {
                return { status: true, content:responsedata }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
    async getExams(){
        try {
            const responsedata = await Exam.find({})
            if (responsedata) {
                return { status: true, content: responsedata,length:responsedata.length }
            }
            else {
                throw new Error("User not found")
            }
        } catch (error: any) {
            return { status: false, content: error.message }

        }
    }
}