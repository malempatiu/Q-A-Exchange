let env = process.env.NODE_ENV || 'development';
if(env === 'development'){
    process.env.PORT = 8081;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/staffbase_api';
} else if(env === 'test'){
    process.env.MONGODB_URI = 'mongodb://localhost:27017/staffbase_test_api';
}
//Importing external modules/librariers
const express = require('express'),
    app = express(),
    cors = require('cors'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

//App and mongoose config
mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
app.use(bodyParser.json());
app.use(cors());

//Importing local files
const {createQuestion, fetchQuestions, getQuestion} = require('./handlers/user-questions');
const {createAnswer} = require('./handlers/user-answers');

//Questions Routes
app.post('/api/questions', createQuestion);
app.get('/api/questions', fetchQuestions);
app.get('/api/questions/:id', getQuestion);

//Answers Routes
app.post('/api/answers/:id', createAnswer);

const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Staffbase Q&A server has started on ${port}`);
});    

module.exports = app;