let env = process.env.NODE_ENV || 'development';
if(env === 'development'){
    process.env.PORT = 8081;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/q_a_api';
} else if(env === 'test'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/q_a_test_api';
}
//Importing external modules/librariers
require('dotenv').config();
const express = require('express'),
    app = express(),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//App and mongoose config
mongoose.Promise = Promise;
let url = process.env.DATABASEURL || process.env.MONGODB_URI;
mongoose.connect(url, { useNewUrlParser: true });
//
app.use(bodyParser.json());
app.use(cors());

//Importing local files
const {createQuestion, fetchQuestions, getQuestion, userCreatedQuestions} = require('./handlers/user-questions');
const {createAnswer, updateAnswer} = require('./handlers/user-answers');
const {createUser, loginUser} = require('./handlers/user-handler');
const {isLoggedIn, isAuthorized} = require('./middleware/user-auth');

//User Routes
app.post('/api/user/signup', createUser);
app.post('/api/user/signin', loginUser);

//Questions & Answers Routes
app.post('/api/user/:id/questions', isLoggedIn, isAuthorized, createQuestion);
app.get('/api/user/:id/questions', isLoggedIn, isAuthorized, userCreatedQuestions);
app.get('/api/questions', fetchQuestions);
app.get('/api/questions/:id', getQuestion);
app.post('/api/user/:id/questions/:question_id/answer', isLoggedIn, isAuthorized, createAnswer);
app.put('/api/user/:id/answers/:answer_id', isLoggedIn, isAuthorized, updateAnswer);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Staffbase Q&A server has started on ${port}`);
});    

module.exports = app;