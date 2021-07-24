import { Injectable } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { QuizTestService } from 'src/quizTest/quizTest.service';
import { CreateUserDto } from './dto/create-user-dto';
import { RequestQuizDto } from './dto/request-quiz.dto';
import { SubmittedQuizDto } from './dto/submitted-quiz.dto';

import { User } from './schemas/users.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly quizTestService: QuizTestService,
    @InjectModel('User') private readonly userModel: Model<User>, 
  ) {}

  // async userLogin(usrname: string, password: string): Promise<any> {
  //   const user = await this.findUser(usrname, null);
  //   if(!user) return { msg: 'User not found' };
  //   if(user.password !== password) return { msg: 'Wrong password' };
  //   return { id: user.id as string, msg: 'Login successful' };
  // }

  async requestQuizForUser(requestQuizDto: RequestQuizDto){
    const user = await this.findUserbyId(requestQuizDto.username);
        if(!user) return { msg: 'User not found' };
    const didTakeQuiz = await this.userTakenTheQuiz(requestQuizDto.username, requestQuizDto.quizId);
        if(didTakeQuiz) return { msg: 'User already took the quiz, try another one.' };
    const quiz = await this.quizTestService.getQuizById(requestQuizDto.quizId);
        if(!quiz) return { msg: 'This quiz is not available.' };
    const reqId = uuid();
      user.takenQuizes.push({
        quizId: requestQuizDto.quizId,
        requestId: reqId,
        takenOn: new Date(),
        finishedOn: new Date(),
        numberOfQuestions: quiz ? quiz.numberOfQuestions : 0,
        score: 0
      });
      await user.save();

      return { requestId: reqId, quizObj: quiz};
  }

  async submitQuiz(submittedQuizDto: SubmittedQuizDto): Promise<any> {
    const user = await this.findUserbyId(submittedQuizDto.username);
      if(!user) return { msg: 'User not found' };
    
    let takenQuiz = user.takenQuizes.find(quiz => quiz.quizId === submittedQuizDto.quizId && quiz.requestId === submittedQuizDto.requestId);
      if(!takenQuiz) return { msg: 'User did not take the quiz' };
      
    let filteredTakenQuizes = user.takenQuizes.filter(quiz => quiz.quizId !== submittedQuizDto.quizId);
      takenQuiz.score = submittedQuizDto.score;
      takenQuiz.finishedOn = new Date();
    const finalTakenQuizes = filteredTakenQuizes.concat([takenQuiz]);

    await user.updateOne({username: submittedQuizDto.username}).set('takenQuizes', finalTakenQuizes).exec();

    return { msg: 'Quiz submitted successfully!', quizId: submittedQuizDto.quizId, score: submittedQuizDto.score};
  }

  async createUser(userObj: CreateUserDto): Promise<any>{
    const newUser = new this.userModel({
        username: userObj.username,
        fullName: userObj.fullName,
        email: userObj.email,
        password: userObj.password,
        isadmin: userObj?.isadmin,
        role: userObj?.role
    });
    const user = await this.findUser(userObj.username, userObj.email);
    if (user) {
      return { id: null, msg:'UserId or Email already registered'};
    }else{
      const result = await newUser.save();
      return { id: result.id as string, msg:'User registered successfully!' };
    }
  }

  async getUsers(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users.map(usr => <User>({
        username: usr.username,
        fullName: usr.fullName,
        email: usr.email,
        created: usr.created,
        takenQuizes: usr.takenQuizes,
        isadmin: usr.isadmin,
        role: usr.role,
        isactive: usr.isactive
    }));
  }

  private async userTakenTheQuiz(usrname: string, quizId: string){
    let takenTheQuiz = await this.userModel.findOne({ username: usrname, takenQuizes: { $elemMatch: { quizId: quizId } } }).exec();
    if(takenTheQuiz){
      return true;
    }else{
      return false;
    }
  }


  async findUser(usrname: string, eml: string): Promise<User> {
    let user = await this.userModel.findOne().or([{ username: usrname }, { email: eml }]).exec();
    return user;
  }

  private async findUserbyId(usrname: string): Promise<User> {
    let user = await this.userModel.findOne({ username: usrname }).exec();
    return user;
  }
}
