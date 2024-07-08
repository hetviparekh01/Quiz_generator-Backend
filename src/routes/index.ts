import {Router} from "express"
import userRoute from "./user.routes"
import queRoute from "./question.routes"
import { jwtTokenVerify } from "../middlewares/auth.middleware"
import examRoute from "./exam.routes"

const Route=Router()

Route.use('/user',userRoute)
Route.use('/question',jwtTokenVerify,queRoute)
Route.use('/exam',jwtTokenVerify,examRoute)

export default Route
