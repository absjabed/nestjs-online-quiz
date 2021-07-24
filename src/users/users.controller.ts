import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { CreateUserDto } from './dto/create-user-dto';
import { RequestQuizDto } from './dto/request-quiz.dto';
import { SubmittedQuizDto } from './dto/submitted-quiz.dto';
//import { User } from './schemas/users.schema';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

//   @Get()
//   async getUsers(): Promise<User[]> {
//       return this.usersService.getUsers();
//   }
  @UseGuards(LocalAuthGuard)
  @Post('registerUser')
  async createUser(@Body() createUserDto: CreateUserDto): Promise<any> {
      return this.usersService.createUser(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('requestQuiz')
  async requestQuizForUser(@Body() requestQuizDto: RequestQuizDto): Promise<any> {
      return this.usersService.requestQuizForUser(requestQuizDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('submitQuiz')
  async submitQuizForUser(@Body() submittedQuizDto: SubmittedQuizDto): Promise<any> {
      return this.usersService.submitQuiz(submittedQuizDto);
  }
}
