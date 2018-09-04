import UserAskedQuestions from '../../reducers/user-questions-reducer';

describe('USERASKEDQUESTIONS REDUCER', () => {
    it('should setup an initial state for @@INIT action type', () => {
          const initialState = UserAskedQuestions(undefined, {type:'@@INIT'});
          expect(initialState.userQuestions).toHaveLength(0);
    });
    it('should setup a state for GET_USER_QUESTIONS action type', () => {
        const userQuestions = [
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
                },
                {
                    id: '999',
                    answer: 'what is abc?',
                    createdAt: 156495589,
                    createdBy: 'ugesh'
                }]
            }
        ];
        const reducerState = UserAskedQuestions(undefined, {type: 'GET_USER_QUESTIONS', userQuestions});
        expect(reducerState.userQuestions).toHaveLength(2);
        expect(reducerState.userQuestions[1].answers).toHaveLength(2);
        expect(reducerState.userQuestions[1].answers[1].id).toBe('999');
    });
});