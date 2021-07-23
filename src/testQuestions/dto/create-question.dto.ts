export class McqQuestionDto {
    questionId: string;
    questionName: string;
    questionDescription: string;
    answerOptions: Option[];
    correctAnswer: number;
    isPublished: boolean;
}

class Option {
    optionId: number;
    optionDescription: string;
    isCorrect: boolean;
}