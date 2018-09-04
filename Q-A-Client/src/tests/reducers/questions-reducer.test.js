import Questions from '../../reducers/questions-reducer';

describe('QUESTIONS REDUCER', () => {
    const questions = [
        {
            text: 'what is Testing?',
            createdAt: 156495589,
            createdBy: 'malempati',
            answers: [{
                id: '321',
                answer: 'what is abc?',
                createdAt: 156495589,
                createdBy: 'ugesh'
            }]
        },
        {
            text: 'what is abc?',
            createdAt: 156495589,
            createdBy: 'malempati',
            answers: [{
                id: '321',
                answer: 'what is abc?',
                createdAt: 156495589,
                createdBy: 'ugesh'
            }]
        }
    ];
    it('should setup an initial state for @@INIT action type', () => {
        const initialState = Questions(undefined, { type: '@@INIT' });
        expect(initialState.questions).toHaveLength(0);
    });
    it('should setup a state for GET_QUESTIONS action type', () => {
         const reducerState = Questions(undefined, {type:'GET_QUESTIONS',questions});
         expect(reducerState.questions).toHaveLength(2);
         expect(reducerState.questions[0].text).toBe('what is Testing?');
    });
    it('should setup a state for ADD_QUESTION action type', () => {
        const question = {
            text: 'what is JEST?',
            createdAt: 156495589,
            createdBy: 'malempati',
            answers: []
        };
        const reducerState = Questions({questions}, {type:'ADD_QUESTION', question});
        expect(reducerState.questions).toHaveLength(3);
        expect(reducerState.questions[2].text).toBe('what is JEST?');
        expect(reducerState.questions[2].answers).toHaveLength(0);
    });
});