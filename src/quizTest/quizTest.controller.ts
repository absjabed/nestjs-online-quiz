import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { QuizTestService } from './quizTest.service';
import { McqQuizDto } from './dto/create-quiz.dto';

@Controller('quiz-test')
export class QuizTestController {
  constructor(private readonly quizTestService: QuizTestService) {}

  @Post('newQuizTest')
  async createNewQuizTest(@Body() mcqQuizDto: McqQuizDto): Promise<any> {
      return this.quizTestService.addNewQuiz(mcqQuizDto);
  }

  @Get('quiz/:quizId')
  async getFullQuiz(@Param('quizId') quizId: string): Promise<any> {
    return this.quizTestService.getQuizById(quizId);
  }

  @Get('deleteQuiz/:quizId')
  async deleteQuiz(@Param('quizId') quizId: string): Promise<any> {
      return this.quizTestService.deleteQuiz(quizId);
  }
}
