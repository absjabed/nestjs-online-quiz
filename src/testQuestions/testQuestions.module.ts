import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TestQuestionsController } from './testQuestions.controller';
import { TestQuestionService } from './testQuestions.service';
import { QuestionSchema } from './schemas/questions.schema';
import { TestSchema } from './schemas/test.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'Question', schema: QuestionSchema }, 
        { name: 'Test', schema: TestSchema }                        
    ]),
  ],
  controllers: [TestQuestionsController],
  providers: [TestQuestionService],
})
export class TestQuestionModule {}
