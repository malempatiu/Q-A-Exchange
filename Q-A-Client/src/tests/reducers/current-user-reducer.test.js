import CurrentUser from '../../reducers/current-user-reducer';

describe('CURRENT USER REDUCER', () => {
    it('should setup default state', () => {
         const initialState = CurrentUser(undefined, {type: '@@INIT'});
         expect(initialState).toEqual({
             isAuthenticated: false,
             user: {}
         });
    });
    it('should setup an object for the passed user data', () => {
        const user = {id:'256fdh23', username: 'ugesh', email: 'malempati'};
        const currentUserState = CurrentUser(undefined, {type: 'SET_CURRENT_USER', user});
        expect(currentUserState.isAuthenticated).toBeTruthy();
    });
});