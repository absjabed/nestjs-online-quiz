import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';
import { Question } from './questions.schema';

export const TestSchema = new mongoose.Schema({
    testId: { type: String, unique: true, default: uuidv4() },
    testName: { type: String, required: true },
    testDescription: { type: String, required: true },
    questions: { type: Array, default:[] },
    numberOfQuestions:{ type: Number, required: true },
    testDuration: { type: Number, required: true },
    testStatus: { type: String, required: true, enum: ['active', 'inactive', 'deleted'] },
    testIsOpen: { type: Boolean, required: true },

});

export interface Test extends mongoose.Document {
    testId: string;
    testName: string;
    testDescription: string;
    questions: Question[];
    numberOfQuestions: number;
    testDuration: number;
    testStatus: string;
    testIsOpen: boolean;
}
