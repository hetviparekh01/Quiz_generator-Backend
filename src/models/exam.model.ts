import mongoose, { Schema } from "mongoose";
import IExam from "../interfaces/exam.interface";

const ExamSchema = new Schema<IExam>({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    questions: [
        new Schema({
            queId: {
                type: Schema.Types.ObjectId,
                ref: "question",
                required: [true, "questionId is required"]
            },
            question: {
                type: String,
                required: [true, "question is required"]
            },
            options: {
                type: [String],
                required: [true, "question is required"]
            }
        }, {
            timestamps: false,
            _id: false
        })
    ],
    score: { type: Number, required: true },
    submitted: {
        type: Boolean,
        default: false
    }

},{
    timestamps: true
})
export const Exam = mongoose.model("exam", ExamSchema)
