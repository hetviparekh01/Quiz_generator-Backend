import mongoose, { Document } from 'mongoose';

interface IExam extends Document {
  userId:mongoose.Schema.Types.ObjectId ; 
  questions:[
    {
        queId:mongoose.Schema.Types.ObjectId,
        question:string,
        options:string[]
    }
  ]; 
  score: number;
  submitted:boolean
}

export default IExam;
