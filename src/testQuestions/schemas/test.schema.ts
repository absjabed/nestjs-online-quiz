import { v4 as uuidv4 } from 'uuid';
import * as mongoose from 'mongoose';

export const TestSchema = new mongoose.Schema({
    testId: { type: String, unique: true, default: uuidv4() },
    testName: { type: String, required: true },
    testDescription: { type: String, required: true },
    questionIds: [{ type: mongoose.Schema.Types.ObjectId, ref:'Question' }],
    testDuration: { type: Number, required: true },
    testStatus: { type: String, required: true, enum: ['active', 'inactive', 'deleted'] },
    testIsOpen: { type: Boolean, required: true },

});

export interface Test extends mongoose.Document {
    testId: string;
    testName: string;
    testDescription: string;
    questionIds: string[];
    testDuration: number;
    testStatus: string;
    testIsOpen: boolean;
}
