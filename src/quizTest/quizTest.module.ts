import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionSchema } from 'src/quizQuestions/schemas/questions.schema';
import { QuizTestController } from './quizTest.controller';
import { QuizTestService } from './quizTest.service';
import { QuizSchema } from './schemas/quiz.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
        { name: 'Question', schema: QuestionSchema },
        { name: 'Quiz', schema: QuizSchema }                        
    ]),
  ],
  controllers: [QuizTestController],
  providers: [QuizTestService],
  exports: [QuizTestService],
})
export class QuizTestModule {}
