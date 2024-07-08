import {Router} from "express"

import { roleVerify } from "../middlewares/role.middleware"
import { ExamController } from "../controllers/exam.controller"

const exam_controller=new ExamController()

const examRoute=Router()

examRoute.get('/generateexam',roleVerify(['user','admin']),exam_controller.generateExam)
examRoute.post('/submitexam/:id',roleVerify(['user','admin']),exam_controller.checkAnswer)




export default examRoute