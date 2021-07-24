import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuizQuestionsController } from './quizQuestions.controller';
import { QuizQuestionService } from './quizQuestions.service';
import { QuestionSchema } from './schemas/questions.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'Question', schema: QuestionSchema }                      
    ]),
  ],
  controllers: [QuizQuestionsController],
  providers: [QuizQuestionService],
})
export class QuizQuestionModule {}
