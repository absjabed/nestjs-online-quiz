import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user-dto';
import { RequestQuizDto } from './dto/request-quiz.dto';
import { SubmittedQuizDto } from './dto/submitted-quiz.dto';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getUsers(): Promise<User[]> {
      return this.usersService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
      return this.usersService.createUser(createUserDto);
  }

  @Post('requestQuiz')
  async requestQuizForUser(@Body() requestQuizDto: RequestQuizDto): Promise<any> {
      return this.usersService.requestQuizForUser(requestQuizDto);
  }

  @Post('submitQuiz')
  async submitQuizForUser(@Body() submittedQuizDto: SubmittedQuizDto): Promise<any> {
      return this.usersService.submitQuiz(submittedQuizDto);
  }
}
