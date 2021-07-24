import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { McqQuestionDto } from './dto/create-question.dto';
import { updateMcqQuestionDto } from './dto/update-question.dto';
import { Question } from './schemas/questions.schema';
import { QuizQuestionService } from './quizQuestions.service';

@Controller('quiz-questions')
export class QuizQuestionsController {
  constructor(private readonly quizQuestionsService: QuizQuestionService) {}

  @Get('questions')
  async getQuestions(): Promise<Question[]> {
      return this.quizQuestionsService.getAllQuestions();
  }

  @Post('newQuestion')
  async addNewQuestion(@Body() mcqQuestionDto: McqQuestionDto): Promise<any> {
      return this.quizQuestionsService.addNewQuestion(mcqQuestionDto);
  }

  @Patch('updateQuestion')
  async updateQuestion(@Body() updateQuestionDto: updateMcqQuestionDto) {
      return this.quizQuestionsService.updateQuestion(updateQuestionDto);
  }

}
