import { GET_USER_QUESTIONS } from '../actions/action-constants';

const userInitialQuestionsState = {
    userQuestions: []
};

const UserAskedQuestions = (state = userInitialQuestionsState, action) => {

    switch (action.type) {
        case GET_USER_QUESTIONS:
            return {
                ...state,
                userQuestions: action.userQuestions
            };
        default:
            return state;
    }
};

export default UserAskedQuestions;