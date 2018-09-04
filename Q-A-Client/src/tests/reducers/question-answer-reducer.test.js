import QuestionAndAnswer from '../../reducers/question-answer-reducer';

describe('QUESTIONANDANSWER REDUCER', () => {
    const question = {
        text: 'what is abc?',
        createdAt: 156495589,
        createdBy: 'malempati',
        answers: [{
            id: '321',
            answer: 'what is abc?',
            createdAt: 156495589,
            createdBy: 'ugesh'
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
            id: '2111',
            answer: 'what is cba?',
            createdAt: 156495589,
            createdBy: 'ugeshmalempati',
        };
        const reducerState = QuestionAndAnswer(question, {type:'ADD_ANSWER', answer});
        expect(reducerState.answers).toHaveLength(2);
    });
});