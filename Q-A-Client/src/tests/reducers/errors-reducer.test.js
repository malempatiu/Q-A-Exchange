import Errors from '../../reducers/errors-reducer';

describe('ERRORS REDUCER', () => {
   it('should setup an initial state', () => {
       const errorInitialState = Errors(undefined, {type:'@@INIT'});
       expect(errorInitialState.error).toBeNull();
   });
   it('should setup a state for the add error type', () => {
       const error = 'Not Authorized';
       const errorState = Errors(undefined, {
           type: 'ADD_ERROR',
            error
        });
        expect(errorState.error).toBe(error);
   });
   it('should setup an empty string for remove error type', () => {
        const errorState = Errors(undefined, {type:'REMOVE_ERROR'});
        expect(errorState.error.length).toBe(0); 
   });
});