const request = require('supertest'),
    expect = require('expect'),
    { ObjectID } = require('mongodb');

const app = require('../index'),
    Question = require('../models/questions');

let questionID;

describe('POST /api/questions', () => {
    before((done) => {
        Question.remove({}).then(() => {
            done();
        });
    });
    it('should create a user question', (done) => {
        const text = 'What is Node.js?';
        request(app)
            .post('/api/questions')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.createdQuestion.text).toBe(text);
                questionID = res.body.createdQuestion._id;
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                Question.find({}).then((questions) => {
                    expect(questions.length).toBe(1);
                    expect(questions[0].text).toBe(text);
                    done();
                })
                    .catch((err) => done(err));

            })
    });
});

describe('GET /api/questions', () => {
    it('should fetch all user questions', (done) => {
        request(app)
            .get('/api/questions')
            .expect(200)
            .end(done);
    });
});

describe('GET /api/questions/:id', () => {
    it('should not return a question for invalid id', (done) => {
        request(app)
            .get(`/api/questions/123`)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("Invalid Question ID");
            })
            .end(done);
    });
    it('should not return a question for other valid id', (done) => {
        const id = new ObjectID();
        request(app)
            .get(`/api/questions/${id}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("No questions and answers found the given ID");
            })
            .end(done);
    });
    it('should return a specific question for the given ID', (done) => {
        request(app)
            .get(`/api/questions/${questionID}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.question._id).toBe(questionID);
            })
            .end(done);
    });
});

describe('POST /api/answers/:id', () => {
    it('should not create answer for invalid question id', (done) => {
        request(app)
            .post(`/api/answers/123`)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("Invalid ID");
            })
            .end(done);
    });
    it('should not create answer for other valid question id', (done) => {
        const id = new ObjectID();
        request(app)
            .post(`/api/answers/${id}`)
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("No question found for the given ID");
            })
            .end(done);
    });
    it('should create anwer', (done) => {
        const answer = 'As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.'
        request(app)
            .post(`/api/answers/${questionID}`)
            .send({answer})
            .expect(200)
            .expect((res) => {
                expect(res.body.answer.answer).toBe(answer);
            })
            .end((err, res) => {
                if(err){
                    return done(err);
                };

                Question.find({}).then((questions) => {
                    expect(questions.length).toBe(1);
                    expect(questions[0].answers.length).toBe(1);
                    done();
                })
                .catch((err) => done(err));
            });
    });
});