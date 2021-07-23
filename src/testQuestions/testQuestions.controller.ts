import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { McqQuestionDto } from './dto/create-question.dto';
import { updateMcqQuestionDto } from './dto/update-question.dto';
// import { User } from './schemas/users.schema';
// import { UsersService } from './users.service';

import { Question } from './schemas/questions.schema';
import { TestQuestionService } from './testQuestions.service';

@Controller('test-questions')
export class TestQuestionsController {
  constructor(private readonly testQuestionsService: TestQuestionService) {}

//   @Get(':userId')
//   async getUser(@Param('userId') userId: string): Promise<User> {
//     return this.usersService.getUserById(userId);
//   }

  @Get('questions')
  async getQuestions(): Promise<Question[]> {
      return this.testQuestionsService.getAllQuestions();
  }

  @Post('newQuestion')
  async createUser(@Body() mcqQuestionDto: McqQuestionDto): Promise<any> {
      return this.testQuestionsService.addNewQuestion(mcqQuestionDto);
  }

  //@Patch(':qid')
  @Patch('updateQuestion')
  async updateQuestion(@Body() updateQuestionDto: updateMcqQuestionDto) {
      return this.testQuestionsService.updateQuestion(updateQuestionDto);
  }
}
