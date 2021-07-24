import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { McqQuestionDto } from './dto/create-question.dto';
import { updateMcqQuestionDto } from './dto/update-question.dto';
import { Question } from './schemas/questions.schema';
import { QuizQuestionService } from './quizQuestions.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
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
