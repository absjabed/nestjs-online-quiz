import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { QuizTestService } from './quizTest.service';
import { McqQuizDto } from './dto/create-quiz.dto';
import { UpdateMcqQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './schemas/quiz.schema';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('quiz-test')
export class QuizTestController {
  constructor(private readonly quizTestService: QuizTestService) {}

  @Post('newQuizTest')
  async createNewQuizTest(@Body() mcqQuizDto: McqQuizDto): Promise<any> {
      return this.quizTestService.addNewQuiz(mcqQuizDto);
  }

  @Get('availableQuizes')
  async getAllQuizes(): Promise<any> {
    const quizs: Quiz[] = await this.quizTestService.getAllQuizes();
    if(quizs.length == 0) return { msg: 'No quiz available.' };
    return quizs;
  }

  // @Get('deleteQuiz/:quizId')
  // async deleteQuiz(@Param('quizId') quizId: string): Promise<any> {
  //     return this.quizTestService.deleteQuiz(quizId);
  // }
  
  @Patch('updateQuiz')
  async updateQuiz(@Body() updateMcqQuizDto: UpdateMcqQuizDto): Promise<any> {
      return this.quizTestService.updateQuiz(updateMcqQuizDto);
  }
}
