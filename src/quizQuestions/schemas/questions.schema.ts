import * as mongoose from 'mongoose';

export const QuestionSchema = new mongoose.Schema({
    questionId: { type: String, required: true, unique: true },
    questionName: { type: String, required: true },
    questionDescription: { type: String, required: true },
    answerOptions: { type: Array, required: true },
    correctAnswer: { type: Number, required: true },
    isPublished: { type: Boolean, required: true },
});

export interface Question extends mongoose.Document {
    id: string,
    questionId: string;
    questionName: string;
    questionDescription: string;
    answerOptions: Array<any>;
    correctAnswer: number;
    isPublished: boolean;
}
