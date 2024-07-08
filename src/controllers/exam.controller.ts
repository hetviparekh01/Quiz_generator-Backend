// examController.ts

import { Request, Response } from 'express';
import { ExamService } from '../services/exam.service';
import { Exam } from '../models/exam.model';
import { Token } from '../middlewares/auth.middleware';

const exam_service = new ExamService()

export class ExamController {
    async generateExam(req: Request, res: Response) {
        try {
            const userToken: Token = req.user
            let userScore;
            const exams = await Exam.find({ userId: userToken.userId });
            if (exams.length === 0) {
                userScore = 0
            } else {
                let totalScore = 0;
                for (const exam of exams) {
                    totalScore += exam.score;
                }
                userScore = totalScore
            }
            const responsedata = await exam_service.generateExam(userToken.userId, userScore);
            if (responsedata.status) {
                return res.json({ status: responsedata.status, content: responsedata.content })
            }
            else {
                return res.json({ status: responsedata.status, content: responsedata.content })
            }

        } catch (error: any) {
            return res.json({ status: false, content: error.message })

        }
    }
    async checkAnswer(req: Request, res: Response) {
        try {
            let answerdata = req.body
            const userToken: Token = req.user
            const examId = req.params.id
            const responsedata = await exam_service.checkanswer(examId, userToken.userId, answerdata);
            if (responsedata.status) {
                return res.json({ status: responsedata.status, content: responsedata.content })
            }
            else {
                return res.json({ status: responsedata.status, content: responsedata.content })
            }
        } catch (error: any) {
            return res.json({ status: false, content: error.message })

        }
    }
}
