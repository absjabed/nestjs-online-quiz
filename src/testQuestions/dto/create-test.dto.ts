import { Schema } from "mongoose";
// import { McqQuestionDto } from "./create-question.dto";
//[{ type: Schema.Types.ObjectId, ref:'Comment' }],
export class McqTestDto {
    testId: string;
    testName: string;
    testDescription: string;
    questionIds: string[];
    testDuration: number;
    testStatus: string;
    testIsOpen: boolean;
}