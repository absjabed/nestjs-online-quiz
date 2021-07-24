export class UpdateMcqQuizDto {
    quizId: string;
    quizName?: string;
    quizDescription?: string;
    numberOfQuestions?: number;
    quizDuration?: number;
    quizStatus?: string;
    quizIsOpen?: boolean;
}