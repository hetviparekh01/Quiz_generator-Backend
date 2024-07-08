import { Request,Response } from "express";
import { QuestionService } from "../services/question.service";
import { IQuestion } from "../interfaces/questiones";
const question_service=new QuestionService
export class QuestionController{
    async createQuestion(req: Request, res: Response) {
        const questiondata:IQuestion = req.body;
        try {
          const responsedata = await question_service.createQuestion(questiondata);
          if(responsedata.status){
            return res.status(200).json({status:responsedata.status,content:responsedata.content})
        }
        else{
            return res.status(200).json({status:responsedata.status,content:responsedata.content})
        }
        
        } catch (error:any) {
            return res.status(200).json({status:false,content:error.message})   

        }
      }
      async getQuestion(req: Request, res: Response) {
        try {
          const responsedata = await question_service.getquestions();
          if(responsedata.status){
            return res.status(200).json({status:responsedata.status,content:responsedata.content})
        }
        else{
            return res.status(200).json({status:responsedata.status,content:responsedata.content})
        }
        
        } catch (error:any) {
            return res.status(200).json({status:false,content:error.message})   

        }
      }
}