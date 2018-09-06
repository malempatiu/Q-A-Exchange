import QuestionAndAnswer from '../../reducers/question-answer-reducer';

describe('QUESTIONANDANSWER REDUCER', () => {
    const question = {
        text: 'what is abc?',
        createdAt: 156495589,
        createdBy: 'malempati',
        answers: [{
            _id: '321',
            answer: 'what is abc?',
            createdAt: 156495589,
            createdBy: 'ugesh',
            isHelped: false
        }]
    };
    it('should setup an initial state', () => {
        const initialState = QuestionAndAnswer(undefined, { type: '@@INIT' });
        expect(initialState).toEqual({
            text: '',
            createdAt: null,
            createdBy: null,
            answers: []
        });
    });
    it('setup an object for the GET_QUESTION type', () => {
        const reducerState = QuestionAndAnswer(undefined, {
            type: 'GET_QUESTION',
            question
        });
        expect(reducerState).toEqual(question);
        expect(reducerState.answers).toHaveLength(1);
    });
    it('should setup an object for the ADD_ANSWER type', () => {
        const answer = {
            _id: '2111',
            answer: 'what is cba?',
            createdAt: 156495589,
            createdBy: 'ugeshmalempati',
            isHelped: false
        };
        const reducerState = QuestionAndAnswer(question, {type:'ADD_ANSWER', answer});
        expect(reducerState.answers).toHaveLength(2);
    });
    it('should setup an object for the UPDATE_ANSWER type', () => {
        const updatedAnswer = {
            _id: '321',
            answer: 'what is cba?',
            createdAt: 156495589,
            createdBy: 'ugeshmalempati',
            isHelped: true
        };
        const reducerState = QuestionAndAnswer(question, {type:'UPDATE_ANSWER', updatedAnswer});
        expect(reducerState.answers[0].isHelped).toBeTruthy();
    });
});