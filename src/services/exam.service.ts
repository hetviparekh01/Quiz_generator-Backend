import { Schema } from 'mongoose';
import { Exam } from '../models/exam.model';
import { Question } from '../models/questiones.model';

interface ExamQuestion {
    questiones: any;
    queId: Schema.Types.ObjectId;
    answer: string;
}

export interface AnswerData {

    questions: ExamQuestion[];

}
export class ExamService {
    async generateExam(userId: Schema.Types.ObjectId, userScore: number) {
        try {
            const activeExam = await Exam.findOne({ userId: userId, submitted: false });
            if (activeExam) {
                let responsedata = {
                    examId: activeExam._id,
                    questions: activeExam.questions,
                    previousScore: activeExam.score,
                    message: "You have an active exam in progress. Finish it before generating a new one."
                };
                return { status: true, content: responsedata };
            }
            let difficultyRange;
            if (userScore > 4 && userScore < 8) {
                difficultyRange = { $gte: 4, $lt: 6 };
            }
            else if(userScore > 8 && userScore < 12){
                difficultyRange = { $gte: 6, $lt: 8 };
            } else if(userScore > 12 && userScore < 15){
                difficultyRange = { $gte: 8, $lte: 10 };
            }
            else{
                difficultyRange = { $gte: 1, $lt: 4 };
            }
            const genratedquestions = await Question.aggregate([
                {
                    $match: {
                        difficulty: difficultyRange
                    }
                },
                { $sample: { size: 3 } },
                {
                    $project: {
                        _id: 1,
                        question: 1,
                        options: 1
                    }
                }
            ]);
            let outputdata = await Exam.create({
                userId: userId, questions: genratedquestions.map(question => ({
                    queId: question._id,
                    question: question.question,
                    options: question.options
                })), score: userScore
            })
            
            let responsedata = {
                examId: outputdata._id,
                questions: outputdata.questions,
                previousScore: outputdata.score
            };

            if (responsedata) {
                return { status: true, content: responsedata }
            }
            else {
                throw new Error("question not found")
            }

        } catch (error) {
            throw new Error('Failed to generate exam');
        }
    }
    async checkanswer(examId: string, userId: Schema.Types.ObjectId, answerdata: ExamQuestion) {
        try { 
            let score=0;
            const answers = answerdata.questiones;
            for (const answer of answers) {
                const question = await Question.findById(answer.queId);
                if (!question) {
                    throw new Error(`Question with ID ${answer.queId} not found`);
                }
                if (question.correctAnswer === answer.answer) {
                    score++;
                }
            }
            const updatedExam = await Exam.findByIdAndUpdate(examId, { score: score, submitted: true }, { new: true });

            if (!updatedExam) {
                throw new Error(`Exam with ID ${examId} not found`);
            }
            
            let responsedata = {
                message: "Your Score for the given questiones",
                score: score
            }
            if (responsedata) {
                return { status: true, content: responsedata }
            }
            else {
                throw new Error("Score  not calculated")
            }
        } catch (error: any) {
            throw new Error(`Failed to check answer: ${error.message}`);
        }
    }

}
