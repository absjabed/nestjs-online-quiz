import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { McqQuestionDto } from './dto/create-question.dto';
import { McqTestDto } from './dto/create-test.dto';
import { updateMcqQuestionDto } from './dto/update-question.dto';
import { Question } from './schemas/questions.schema';
import { Test } from './schemas/test.schema';

@Injectable()
export class TestQuestionService {
  constructor(
    @InjectModel('Question') private readonly questionModel: Model<Question>,
    @InjectModel('Test') private readonly testModel: Model<Test>,
  ) {}

  async addNewTest(testObj: McqTestDto): Promise<any>{
    const existingTest = await this.testExists(testObj.testId);
    
    if (existingTest) {
      return { id: null, msg:'This Test ID already exists.'};
    }else{
      // let questionsRef: Types.ObjectId[];
      // questionsRef = testObj.questionIds.map(item =>{
      //   let exists = this.questionModel.exists({_id: new Types.ObjectId(item)});
      //   if(exists){
      //     return new Types.ObjectId(item);
      //   }
      // });
      // console.log(JSON.stringify(questionsRef));
      const newTest = new this.testModel({
        testId: testObj.testId,
        testName: testObj.testName,
        testDescription: testObj.testDescription,
        questions: [],
        numberOfQuestions: testObj.numberOfQuestions,
        testDuration: testObj.testDuration,
        testStatus: testObj.testStatus,
        testIsOpen: testObj.testIsOpen
      });
      const result = await newTest.save();
      let testPopulate = await this.testModel.findOne({ testId: newTest.testId}).exec();

      return { id: result.id as string, testid: result.testId, msg:'New Test Added successfully!', added: testPopulate };
    }
  }


  async deleteTest(testid: string) {
    const result = await this.testModel.deleteOne({ testId: testid}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find the question.');
    }else{
      return { msg: "Test deleted successfully" }
    }
  }

  async addNewQuestion(questionObj: McqQuestionDto): Promise<any>{
    const existingQuestion = await this.questionExists(questionObj.questionId);

    if (existingQuestion) {
      return { id: null, msg:'This Question ID already exists.'};
    }else{
        const newQuestion = new this.questionModel({
          questionId: questionObj.questionId,
          questionName: questionObj.questionName,
          questionDescription: questionObj.questionDescription,
          answerOptions: questionObj.answerOptions,
          correctAnswer: questionObj.correctAnswer,
          isPublished: questionObj.isPublished
      });
      const result = await newQuestion.save();
      return { id: result.id as string, qid: result.questionId, msg:'New Question Added successfully!' };
    }
  }

  async getAllQuestions(): Promise<Question[]> {
    const questions = await this.questionModel.find().exec();
    return questions.map(qstn => <Question>({
        id: qstn.id as string,
        questionId: qstn.questionId,
        questionName: qstn.questionName,
        questionDescription: qstn.questionDescription,
        answerOptions: qstn.answerOptions,
        correctAnswer: qstn.correctAnswer,
        isPublished: qstn.isPublished
    }));
  }

  async getTestById(testId: string) {
    let testPopulate = await this.testModel.findOne({ testId: testId, testIsOpen: true}).exec();

    if (testPopulate) {
      let numberOfQuestions = testPopulate.numberOfQuestions;
      let randomQuestions = await this.questionModel.aggregate(
        [
        {$match: {isPublished: true}},
        {$sample: {size: numberOfQuestions}}
        ]).exec();
      testPopulate.questions = randomQuestions;
      return testPopulate
    }else{
      return {msg: "This test is not available."}
    }
  }

  async updateQuestion(questionObj: updateMcqQuestionDto) {
    const updatedQuestion = await this.questionExists(questionObj.questionId);
    if (questionObj.questionName) {
        updatedQuestion.questionName = questionObj.questionName;
    }
    if (questionObj.questionDescription) {
        updatedQuestion.questionDescription = questionObj.questionDescription;
    }
    if (questionObj.answerOptions) {
        updatedQuestion.answerOptions = questionObj.answerOptions;
    }
    if (questionObj.correctAnswer) {
        updatedQuestion.correctAnswer = questionObj.correctAnswer;
    }
    if (questionObj.isPublished) {
        updatedQuestion.isPublished = questionObj.isPublished;
    }
    await updatedQuestion.save();
    
    return { id: updatedQuestion.questionId, msg: 'Question Updated successfully!' };
  }

  async deleteQuestion(qid: string) {
    const result = await this.questionModel.deleteOne({ questionId: qid}).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find the question.');
    }
  }

  private async questionExists(qid: string): Promise<Question> {
    let existingQuestion = await this.questionModel.findOne({ questionId: qid }).exec();
    return existingQuestion;
  }

  private async testExists(testid: string): Promise<Test> {
    let existingTest = await this.testModel.findOne({ testId: testid }).exec();
    return existingTest;
  }
}
