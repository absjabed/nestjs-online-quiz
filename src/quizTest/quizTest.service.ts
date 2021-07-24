import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/quizQuestions/schemas/questions.schema';
import { McqQuizDto } from './dto/create-quiz.dto';
import { UpdateMcqQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './schemas/quiz.schema';

@Injectable()
export class QuizTestService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>,
    @InjectModel('Quiz') private readonly quizModel: Model<Quiz>,
  ) {}

  async addNewQuiz(quizObj: McqQuizDto): Promise<any>{
    const existingQuiz = await this.quizExists(quizObj.quizId);
    
    if (existingQuiz) {
      return { id: null, msg:'This Quiz ID already exists.'};
    }else{

      const newQuiz = new this.quizModel({
        quizId: quizObj.quizId,
        quizName: quizObj.quizName,
        quizDescription: quizObj.quizDescription,
        questions: [],
        numberOfQuestions: quizObj.numberOfQuestions,
        quizDuration: quizObj.quizDuration,
        quizStatus: quizObj.quizStatus,
        quizIsOpen: quizObj.quizIsOpen
      });
      const result = await newQuiz.save();
      let quizPopulate = await this.quizModel.findOne({ quizId: newQuiz.quizId}).exec();

      return { id: result.id as string, quizid: result.quizId, msg:'New quiz Added successfully!', added: quizPopulate };
    }
  }

  async deleteQuiz(quizid: string) {
    const result = await this.quizModel.deleteOne({ quizId: quizid}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find the Quiz Test.');
    }else{
      return { msg: "Quiz Test deleted successfully" }
    }
  }

  async getQuizById(quizId: string): Promise<any> {
    let quizPopulate = await this.quizModel.findOne({ quizId: quizId, quizIsOpen: true}).exec();
    if (!quizPopulate) return null;
    
      let numberOfQuestions = quizPopulate.numberOfQuestions;
      let randomQuestions = await this.questionModel.aggregate(
                                    [
                                      {$match: {isPublished: true}},
                                      {$sample: {size: numberOfQuestions}}
                                    ]).exec();

      quizPopulate.questions = randomQuestions;
      return quizPopulate
  }

  async getAllQuizes(): Promise<any> {
    let allQuizes = await this.quizModel.find({quizIsOpen: true}).exec();
    return allQuizes.map(quiz => ({
      quizId: quiz.quizId,
      quizName: quiz.quizName,
      quizDescription: quiz.quizDescription,
      numberOfQuestions: quiz.numberOfQuestions,
      quizDuration: quiz.quizDuration,
    }));
  }

  async updateQuiz(updateMcqQuizDto: UpdateMcqQuizDto) {
    const updatedQuiz = await this.quizExists(updateMcqQuizDto.quizId);
    if (updatedQuiz) {
      if (updateMcqQuizDto.quizName) {
        updatedQuiz.quizName = updateMcqQuizDto.quizName;
      }
      if (updateMcqQuizDto.quizDescription) {
          updatedQuiz.quizDescription = updateMcqQuizDto.quizDescription;
      }
      if (updateMcqQuizDto.numberOfQuestions) {
          updatedQuiz.numberOfQuestions = updateMcqQuizDto.numberOfQuestions;
      }
      if (updateMcqQuizDto.quizDuration) {
          updatedQuiz.quizDuration = updateMcqQuizDto.quizDuration;
      }
      if (updateMcqQuizDto.quizStatus) {
          updatedQuiz.quizStatus = updateMcqQuizDto.quizStatus;
      }
      if (updateMcqQuizDto.quizIsOpen) {
        updatedQuiz.quizIsOpen = updateMcqQuizDto.quizIsOpen;
      }
      await updatedQuiz.save();
      
      return { id: updatedQuiz.quizId, msg: 'Quiz Updated successfully!' };
    }else{
      return { id: null, msg: 'No Quiz Found!' };
    }
    
  }

  private async quizExists(quizid: string): Promise<Quiz> {
    let existingQuiz = await this.quizModel.findOne({ quizId: quizid }).exec();
    return existingQuiz;
  }
}
