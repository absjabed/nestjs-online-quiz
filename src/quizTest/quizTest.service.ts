import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Question } from 'src/quizQuestions/schemas/questions.schema';
import { McqQuizDto } from './dto/create-quiz.dto';
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

  async getQuizById(quizId: string) {
    let quizPopulate = await this.quizModel.findOne({ quizId: quizId, quizIsOpen: true}).exec();

    if (quizPopulate) {
      let numberOfQuestions = quizPopulate.numberOfQuestions;
      
      let randomQuestions = await this.questionModel.aggregate(
                                    [
                                      {$match: {isPublished: true}},
                                      {$sample: {size: numberOfQuestions}}
                                    ]).exec();

      quizPopulate.questions = randomQuestions;
      return quizPopulate
    }else{
      return {msg: "This quiz is not available."}
    }
  }

  private async quizExists(quizid: string): Promise<Quiz> {
    let existingQuiz = await this.quizModel.findOne({ quizId: quizid }).exec();
    return existingQuiz;
  }
}
