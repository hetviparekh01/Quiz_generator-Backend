import {Router} from "express"
import { QuestionController } from "../controllers/question.controller"
import { roleVerify } from "../middlewares/role.middleware"

const question_controller=new QuestionController()

const queRoute=Router()

queRoute.post('/addquestion',roleVerify(['admin']),question_controller.createQuestion)
queRoute.get('/getquestion',roleVerify(['admin']),question_controller.getQuestion)


export default queRoute