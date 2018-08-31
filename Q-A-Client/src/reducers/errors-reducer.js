import { ADD_ERROR, REMOVE_ERROR } from '../actions/action-constants';

const initialError = {
    error: null
};

const Errors = (state = initialError, action) => {
    switch (action.type) {
        case ADD_ERROR:
            return {
                error: action.error
            };
        case REMOVE_ERROR:
            return {
                error: ''
            }
        default:
            return state;
    }
};

export default Errors;