const request = require('supertest'),
    expect = require('expect'),
    { ObjectID } = require('mongodb');

const app = require('../index'),
    Question = require('../models/questions'),
    User = require('../models/user');

let questionID;
let answerID;
let token;
let createdBy;
let userID;

/* User Routes Test Cases*/
describe('POST /api/user/signup', function () {
    this.timeout(3000);
    before((done) => {
        User.remove({}).then(() => {
            done();
        });
    });

    it('should create a user', (done) => {
        const email = "abc@gmail.com";
        const username = "abc";
        const password = "abc123"
        request(app)
            .post('/api/user/signup')
            .send({ email, username, password })
            .expect(200)
            .expect((res) => {
                expect(res.body.email).toBe(email);
                userID = res.body._id;
                createdBy = res.body.email;
            })
            .end((err, res) => {
                if (err) {
                    done(err);
                };
                User.findOne({ email }).then((user) => {
                    expect(user.email).toBe(email);
                    expect(user._id.toHexString()).toBe(userID);
                    done();
                })
                    .catch((err) => done(err));
            });
    });

    it('should not create user for invalid input', (done) => {
        request(app)
            .post('/api/user/signup')
            .send({ email: "ugesh", username: "ugesh", password: "4455" })
            .expect(400)
            .end(done);
    });
});

describe('POST /api/user/signin', () => {
    it('should login the user', (done) => {
        request(app)
            .post('/api/user/signin')
            .send({ email: "abc@gmail.com", password: "abc123" })
            .expect(200)
            .expect((res) => {
                expect(res.body._id).toBe(userID);
                expect(res.body.token).toBeTruthy();
                token = res.body.token;
            })
            .end(done);
    });
    it('should not login the user for wrong data', (done) => {
        request(app)
            .post('/api/user/signin')
            .send({ email: "abc@gmail.com", password: "abc12" })
            .expect(400)
            .end(done);
    });
});

/*Questions and Answers Routes Test Cases*/
describe('POST /api/user/:id/questions', () => {
    before((done) => {
        Question.remove({}).then(() => {
            done();
        });
    });
    it('should create a user question', (done) => {
        const text = 'What is Node.js?';
        request(app)
            .post(`/api/user/${userID}/questions`)
            .set("authorization", `Bearer ${token}`)
            .send({ text, createdBy })
            .expect(200)
            .expect((res) => {
                expect(res.body.createdQuestion.text).toBe(text);
                expect(res.body.createdQuestion.createdBy).toBe(createdBy);
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

describe('GET /api/user/:id/questions', () => {
    it('should get all questions created by a specific user', (done) => {
        request(app)
            .get(`/api/user/${userID}/questions`)
            .set("authorization", `Bearer ${token}`)
            .expect(200)
            .expect((res) => {
                expect(res.body.userQuestions.length).toBe(1);
                expect(res.body.userQuestions[0].text).toBe('What is Node.js?');
            })
            .end(done);
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

describe('POST /api/user/:id/questions/:question_id/answer', () => {
    it('should not create answer for invalid question id', (done) => {
        const answer = 'As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.';
        request(app)
            .post(`/api/user/${userID}/questions/123/answer`)
            .set("authorization", `Bearer ${token}`)
            .send({answer})
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("Invalid ID");
            })
            .end(done);
    });
    it('should not create answer for other valid question id', (done) => {
        const answer = 'As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.';
        const id = new ObjectID();
        request(app)
            .post(`/api/user/${userID}/questions/${id}/answer`)
            .set("authorization", `Bearer ${token}`)
            .send({answer})
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("No question found for the given ID");
            })
            .end(done);
    });
    it('should create anwer', (done) => {
        const answer = 'As an asynchronous event driven JavaScript runtime, Node is designed to build scalable network applications.'
        request(app)
            .post(`/api/user/${userID}/questions/${questionID}/answer`)
            .set("authorization", `Bearer ${token}`)
            .send({answer})
            .expect(200)
            .expect((res) => {
                expect(res.body.answer.answer).toBe(answer);
                answerID = res.body.answer._id;
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

describe('PUT /api/user/:id/anwers/:answer_id', () => {
    const isHelped = true;
    it('should not update an answer for invalid answer id', (done) => {
        request(app)
            .put(`/api/user/${userID}/answers/123`)
            .set("authorization", `Bearer ${token}`)
            .send({isHelped})
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("Invalid ID");
            })
            .end(done);
    });
    it('should not update an answer for other valid answers id', (done) => {
        const id = new ObjectID();
        request(app)
            .put(`/api/user/${userID}/answers/${id}`)
            .set("authorization", `Bearer ${token}`)
            .send({isHelped})
            .expect(404)
            .expect((res) => {
                expect(res.body.error).toBe("No answer found to update. Invalid ID");
            })
            .end(done);
    });
    it('should update anwer', (done) => {
        request(app)
            .put(`/api/user/${userID}/answers/${answerID}`)
            .set("authorization", `Bearer ${token}`)
            .send({isHelped})
            .expect(200)
            .expect((res) => {
                expect(res.body.updatedAnswer.isHelped).toBeTruthy();
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