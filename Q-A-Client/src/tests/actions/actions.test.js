import { addError, removeError, setCurrentUser } from '../../actions/actions';

describe('ACTIONS TESTING', () => {

    describe('ERROR ACTIONS', () => {
        it('should set up an object for the addError action', () => {
            const addErrorActionObject = addError('unable to add error');
            expect(addErrorActionObject).toEqual({
                type: 'ADD_ERROR',
                error: 'unable to add error'
            });
        });
        it('should set up an object for the removeError action', () => {
            const removeErrorActionObject = removeError();
            expect(removeErrorActionObject).toEqual({ type: 'REMOVE_ERROR' });
        });
    });

    describe('USER ACTIONS', () => {
        it('should set up an object for the current user data', () => {
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
    
});
