import { GET_QUESTIONS, ADD_QUESTION } from '../actions/action-constants';

const initialQuestionsState = {
    questions: []
};

const Questions = (state = initialQuestionsState, action) => {

    switch (action.type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: action.questions
            };
        case ADD_QUESTION:
            return {
                ...state,
                questions: [...state.questions, action.question]
            };
        default:
            return state;
    }
};

export default Questions;

