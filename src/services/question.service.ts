import { IQuestion } from "../interfaces/questiones";
import { Question } from "../models/questiones.model";

export class QuestionService {

     async createQuestion(questiondata:IQuestion) {
        try {
            const responsedata = await  Question.create(questiondata);
            if(responsedata){
                return {status:true,content:"scussfully question created"}
            }
            else{
                throw new Error("question not found")
            }
        } catch (error:any) {
            return {status:false,content:error.message} 
        }
    }
    async getquestions(){
        try {
            const responsedata = await  Question.find({});
            if(responsedata){
                return {status:true,content:responsedata}
            }
            else{
                throw new Error("question not found")
            }
        } catch (error:any) {
            return {status:false,content:error.message} 
            
        }
    }
  }