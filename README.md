<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Back-End Developer Challenge (TECHHACK CANADA)
## Online Quiz Application using Nest.js and MongoDB
[Nest](https://github.com/nestjs/nest) is a prograssive [Node.js](https://nodejs.org) framework with TypeScript for building efficient and scalable server-side/backend applications.

## Description

Online quiz application backend with Node.js framework. available features are user login, user register.

## Technologies Used

- Node.js, NestJs
- Typescript
- PassportJs with Jwt - for authentication
- MongoDB
- Mongoose
- rest client
- git




## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Rest-API End Examples

### 1 - register a new user
```
POST http://localhost:3000/users/registerUser
Content-Type: application/json

{ 
    "username": "test2",
    "fullName": "Test User 2",
    "email": "test2@mail.com",
    "password": "pass123"
}
```
### 2 - login
```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
    "username": "test2", 
    "password": "pass123"
}
```
### 3 - get all available quizes
```
GET  http://localhost:3000/quiz-test/availableQuizes
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```

### 4 - request for a quiz
```
POST http://localhost:3000/users/requestQuiz
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.....
{
    "username": "test2",
    "quizId": "quiz03"
}
```
### 5 - submit quiz answer
```
POST http://localhost:3000/users/submitQuiz
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

{
    "username": "test2",
    "quizId": "quiz03",
    "requestId": "c5661978-eb8e-47ff-bbc0-611aa411a64d",
    "score": 30
}
```
### 6 - Add new QuizTest
```
POST http://localhost:3000/quiz-test/newQuizTest
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

{
    "quizId": "quiz04",
    "quizName": "Quiz-04",
    "quizDescription": "This is Quiz-04",
    "numberOfQuestions": 7,
    "quizDuration": 18,
    "quizStatus": "active",
    "quizIsOpen": false
}
```
### 7 - update/patch a quiz
```
PATCH http://localhost:3000/quiz-test/updateQuiz
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

{
    "quizId": "quiz04",
    "quizIsOpen": true
}
```
### 8 - add a new quiz question
```
POST http://localhost:3000/quiz-questions/newQuestion
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjcxMzIyNTgsImV4cCI6MTYyNzEzNTg1OH0._-mm5YYuf9jS0tHVHOr_ZRkh91Mg-5ZUQeImOzVLqPQ

{
        "questionId": "q10",
        "questionName": "Development Knowledge",
        "questionDescription": "What is correct MIME type for JSON ?",
        "answerOptions": [
            {
                "optionId": 1,
                "optionDescription": "json/mime",
                "isCorrect": false
            },
            {
                "optionId": 2,
                "optionDescription": "application/js",
                "isCorrect": false
            },
            {
                "optionId": 3,
                "optionDescription": "application/xml",
                "isCorrect": false
            },
            {
                "optionId": 4,
                "optionDescription": "none of these",
                "isCorrect": true
            }
        ],
        "correctAnswer": 4,
        "isPublished": true
    }
```
### 9 - get all available quiz questions
```
GET  http://localhost:3000/quiz-questions/questions
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....
```
### 10 - update/patch a quiz question
```
PATCH http://localhost:3000/quiz-questions/updateQuestion
Content-Type: application/json
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9....

{
    "questionId": "q1",
    "questionName": "Meaning of life"
}
```



