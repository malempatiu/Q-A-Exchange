import { addError, removeError, setCurrentUser, addQuestion, getQuestion, getQuestions, getUserQuestions, addAnswer, updateAnswer } from '../../actions/actions';

describe('ACTIONS TESTING', () => {

    describe('ERROR ACTIONS', () => {
        it('should setup an object for the addError action', () => {
            const addErrorActionObject = addError('unable to add error');
            expect(addErrorActionObject).toEqual({
                type: 'ADD_ERROR',
                error: 'unable to add error'
            });
        });
        it('should setup an object for the removeError action', () => {
            const removeErrorActionObject = removeError();
            expect(removeErrorActionObject).toEqual({ type: 'REMOVE_ERROR' });
        });
    });

    describe('USER RELATED ACTIONS', () => {
        it('should setup an object for the current user data', () => {
            const user = {
                id: '5432647589',
                email: 'abc@gmail.com',
                username: 'abc',
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
            };
            const userActionObject = setCurrentUser(user);
            expect(userActionObject).toEqual({
                type: 'SET_CURRENT_USER',
                user
            });
        });
    });

    describe('QUESTIONS RELATED ACTIONS', () => {
        it('should setup an object for the addQuestion action', () => {
            const question = {
                id: '2564789',
                text: 'What is Testing?',
                createdAt: 1536009421,
                createdBy: 'abc',
                answers: []
            };
            const addQuestionObject = addQuestion(question);
            expect(addQuestionObject).toEqual({
                type: 'ADD_QUESTION',
                question
            });
        });
        it('should setup an object for the getQuestion action', () => {
            const question = {
                id: '2564789',
                text: 'What is Testing?',
                createdAt: 1536009421,
                createdBy: 'abc',
                answers: [
                    {
                        id: '2564789',
                        answer: 'ksdkfjaeipcnkvjn',
                        createdAt: 1536009421,
                        createdBy: 'abc',
                    }
                ]
            };
            const getQuestionObject = getQuestion(question);
            expect(getQuestionObject).toEqual({
                type: 'GET_QUESTION',
                question
            });
        });
        it('should setup an object for the getQuestions action', () => {
            const questions = [
                {
                    id: '2564789',
                    text: 'What is Testing?',
                    createdAt: 1536009421,
                    createdBy: 'abc',
                    answers: [
                        {
                            id: '2564789',
                            answer: 'ksdkfjaeipcnkvjn',
                            createdAt: 1536009421,
                            createdBy: 'abc',
                        }
                    ]
                }
            ];
            const getQuestionsActionObject = getQuestions(questions);
            expect(getQuestionsActionObject).toEqual({
                type: 'GET_QUESTIONS',
                questions
            });
        });
        it('should setup an object for the getUserQuestions action', () => {
            const userQuestions = [
                {
                    id: '2564789',
                    text: 'What is Testing?',
                    createdAt: 1536009421,
                    createdBy: 'abc',
                    answers: []
                }
            ];
            const getUserQuestionsActionObject = getUserQuestions(userQuestions);
            expect(getUserQuestionsActionObject).toEqual({
                type: 'GET_USER_QUESTIONS',
                userQuestions
            });
        });
    });

    describe('ANSWER RELATED ACTIONS', () => {
        it('should setup an object for addAnswer action', () => {
            const answer = {
                id: '2564789',
                answer: 'What is Testing?',
                createdAt: 1536009421,
                createdBy: 'abc'
            };
            const addAnswerActionObject = addAnswer(answer);
            expect(addAnswerActionObject).toEqual({
                type: 'ADD_ANSWER',
                answer
            });
        });

        it('should setup an object for updateAnswer action', () => {
            const updatedAnswer = {
                id: '2564789',
                answer: 'What is Testing?',
                createdAt: 1536009421,
                createdBy: 'abc',
                isHelped: true
            };
            const updateAnswerActionObject = updateAnswer(updatedAnswer);
            expect(updateAnswerActionObject).toEqual({
                type: 'UPDATE_ANSWER',
                updatedAnswer
            });
        });
    });

});
