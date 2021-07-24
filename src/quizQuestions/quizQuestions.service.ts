import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { McqQuestionDto } from './dto/create-question.dto';
import { updateMcqQuestionDto } from './dto/update-question.dto';
import { Question } from './schemas/questions.schema';

@Injectable()
export class QuizQuestionService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>
  ) {}

  async addNewQuestion(questionObj: McqQuestionDto): Promise<any>{
    const existingQuestion = await this.questionExists(questionObj.questionId);

    if (existingQuestion) {
      return { id: null, msg:'This Question ID already exists.'};
    }else{
        const newQuestion = new this.questionModel({
          questionId: questionObj.questionId,
          questionName: questionObj.questionName,
          questionDescription: questionObj.questionDescription,
          answerOptions: questionObj.answerOptions,
          correctAnswer: questionObj.correctAnswer,
          isPublished: questionObj.isPublished
      });
      const result = await newQuestion.save();
      return { id: result.id as string, qid: result.questionId, msg:'New Question Added successfully!' };
    }
  }

  async getAllQuestions(): Promise<Question[]> {
    const questions = await this.questionModel.find().exec();
    return questions.map(qstn => <Question>({
        id: qstn.id as string,
        questionId: qstn.questionId,
        questionName: qstn.questionName,
        questionDescription: qstn.questionDescription,
        answerOptions: qstn.answerOptions,
        correctAnswer: qstn.correctAnswer,
        isPublished: qstn.isPublished
    }));
  }

  async updateQuestion(questionObj: updateMcqQuestionDto) {
    const updatedQuestion = await this.questionExists(questionObj.questionId);
    if (questionObj.questionName) {
        updatedQuestion.questionName = questionObj.questionName;
    }
    if (questionObj.questionDescription) {
        updatedQuestion.questionDescription = questionObj.questionDescription;
    }
    if (questionObj.answerOptions) {
        updatedQuestion.answerOptions = questionObj.answerOptions;
    }
    if (questionObj.correctAnswer) {
        updatedQuestion.correctAnswer = questionObj.correctAnswer;
    }
    if (questionObj.isPublished) {
        updatedQuestion.isPublished = questionObj.isPublished;
    }
    await updatedQuestion.save();
    
    return { id: updatedQuestion.questionId, msg: 'Question Updated successfully!' };
  }

  async deleteQuestion(qid: string) {
    const result = await this.questionModel.deleteOne({ questionId: qid}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find the question.');
    }
  }

  private async questionExists(qid: string): Promise<Question> {
    let existingQuestion = await this.questionModel.findOne({ questionId: qid }).exec();
    return existingQuestion;
  }

}
