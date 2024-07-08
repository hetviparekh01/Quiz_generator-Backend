import mongoose, { Schema } from "mongoose";
import { IQuestion } from "../interfaces/questiones";

const QuestionSchema = new Schema<IQuestion>({
    question: { 
        type: String, 
        required: true 
    },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    difficulty: { type: Number, required: true },
  });


export const Question = mongoose.model('question', QuestionSchema);
