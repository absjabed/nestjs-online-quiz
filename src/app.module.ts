import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuizQuestionModule } from './quizQuestions/quizQuestions.module';
import { QuizTestModule } from './quizTest/quizTest.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    UsersModule,
    QuizQuestionModule,
    QuizTestModule,
    MongooseModule.forRoot(
      'mongodb+srv://tempusr:izuDmr9dsKUfxPi@cluster0.kxec3.mongodb.net/nestjs-quizapp?retryWrites=true&w=majority',
    ),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
