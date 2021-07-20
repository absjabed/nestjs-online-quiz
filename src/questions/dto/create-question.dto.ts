export class CreateQuestionDto {
    questionId: number;
    questionDescription: string;
    questionType: QuestionType.MultipleChoice;
    answerOptions: Option[];
    correctAnswer: number;
    isAvailable: boolean;
}

class Option {
    optionId: number;
    optionDescription: string;
    isCorrect: boolean;
}

enum QuestionType {
    ["MultipleChoice"] = "MultipleChoice",
    ["ShortAnswer"] = "ShortAnswer",
    ["FillInTheBlank"] = "FillInTheBlank",
    ["TrueFalse"] = "TrueFalse"
}