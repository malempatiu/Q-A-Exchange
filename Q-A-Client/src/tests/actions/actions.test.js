import {addError, removeError} from '../../actions/actions';

describe('ACTIONS TESTING', () => {
   it('should set up an object for the addError action', () => {
        const addErrorActionObject = addError('unable to add error');
        expect(addErrorActionObject).toEqual({
            type: 'ADD_ERROR',
            error: 'unable to add error'
        });
   });
   it('should set up an object for the removeError action', () => {
       const removeErrorActionObject = removeError();
       expect(removeErrorActionObject).toEqual({type:'REMOVE_ERROR'});
   })
});
