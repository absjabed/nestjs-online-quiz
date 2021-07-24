import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { McqQuestionDto } from './dto/create-question.dto';
import { McqTestDto } from './dto/create-test.dto';
import { updateMcqQuestionDto } from './dto/update-question.dto';
// import { User } from './schemas/users.schema';
// import { UsersService } from './users.service';

import { Question } from './schemas/questions.schema';
import { Test } from './schemas/test.schema';
import { TestQuestionService } from './testQuestions.service';

@Controller('test-questions')
export class TestQuestionsController {
  constructor(private readonly testQuestionsService: TestQuestionService) {}

  @Get('test/:testId')
  async getFullTest(@Param('testId') testId: string): Promise<Test> {
    return this.testQuestionsService.getTestById(testId);
  }

  @Get('deleteTest/:testId')
  async deleteTest(@Param('testId') testId: string): Promise<any> {
      return this.testQuestionsService.deleteTest(testId);
  }

  @Get('questions')
  async getQuestions(): Promise<Question[]> {
      return this.testQuestionsService.getAllQuestions();
  }

  @Post('newQuestion')
  async addNewQuestion(@Body() mcqQuestionDto: McqQuestionDto): Promise<any> {
      return this.testQuestionsService.addNewQuestion(mcqQuestionDto);
  }

  @Patch('updateQuestion')
  async updateQuestion(@Body() updateQuestionDto: updateMcqQuestionDto) {
      return this.testQuestionsService.updateQuestion(updateQuestionDto);
  }

  @Post('newTest')
  async createNewTest(@Body() mcqTestDto: McqTestDto): Promise<any> {
      return this.testQuestionsService.addNewTest(mcqTestDto);
  }
}
