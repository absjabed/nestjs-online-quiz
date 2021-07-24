import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';
import { Question } from 'src/quizQuestions/schemas/questions.schema';

export const QuizSchema = new mongoose.Schema({
    quizId: { type: String, unique: true, default: uuidv4() },
    quizName: { type: String, required: true },
    quizDescription: { type: String, required: true },
    questions: { type: Array, default:[] },
    numberOfQuestions:{ type: Number, required: true },
    quizDuration: { type: Number, required: true },
    quizStatus: { type: String, required: true, enum: ['active', 'inactive', 'deleted'] },
    quizIsOpen: { type: Boolean, required: true },

});

export interface Quiz extends mongoose.Document {
    quizId: string;
    quizName: string;
    quizDescription: string;
    questions: Question[];
    numberOfQuestions: number;
    quizDuration: number;
    quizStatus: string;
    quizIsOpen: boolean;
}
