import { SET_CURRENT_USER } from '../actions/action-constants';

const initialUserData = {
    isAuthenticated: false,
    user: {}
};
const CurrentUser = (state = initialUserData, action) => {
    switch (action.type) {
        case SET_CURRENT_USER:
            return {
                ...state,
                isAuthenticated: Object.keys(action.user).length > 0,
                user: action.user
            };
        default:
            return state;
    }
};

export default CurrentUser;