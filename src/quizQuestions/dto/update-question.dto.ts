export class updateMcqQuestionDto {
    questionId: string;
    questionName?: string;
    questionDescription?: string;
    answerOptions?: any[];
    correctAnswer?: number;
    isPublished?: boolean;
}