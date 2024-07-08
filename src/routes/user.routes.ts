import {Router} from "express"
import { UserController } from "../controllers/user.controller"
import { jwtTokenVerify } from "../middlewares/auth.middleware"

const user_controller=new UserController()

const userRoute=Router()

userRoute.post('/signup',user_controller.signup)
userRoute.post('/login',user_controller.login)
userRoute.put('/updateuser',jwtTokenVerify,user_controller.updateUser)
userRoute.delete('/deleteuser',jwtTokenVerify,user_controller.deleteUser)
userRoute.get('/getuser',jwtTokenVerify,user_controller.getParticularUser)
userRoute.get('/getalluser',jwtTokenVerify,user_controller.getUser)
userRoute.get('/getuserbyid/:id',jwtTokenVerify,user_controller.getUserById)
userRoute.put('/updateuser/:id',jwtTokenVerify,user_controller.updateUserByAdmin)
userRoute.delete('/deleteuser/:id',jwtTokenVerify,user_controller.deleteUserByAdmin)
userRoute.get('/getavgscore',jwtTokenVerify,user_controller.getUserAvgScore)
userRoute.get('/getallexam',jwtTokenVerify,user_controller.getExams)

export default userRoute