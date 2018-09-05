import { GET_QUESTION, ADD_ANSWER, UPDATE_ANSWER } from '../actions/action-constants';

const initialData = {
    text: '',
    createdAt: null,
    createdBy: null,
    answers: []
};
const QuestionAndAnswer = (state = initialData, action) => {
    switch (action.type) {
        case GET_QUESTION:
            return {
                ...state,
                text: action.question.text,
                createdAt: action.question.createdAt,
                createdBy: action.question.createdBy,
                answers: action.question.answers
            };
        case ADD_ANSWER:
            return {
                ...state,
                answers: [...state.answers, action.answer]
            };
        case UPDATE_ANSWER:
            state.answers.forEach((answer) => {
                if (answer._id === action.updatedAnswer._id) {
                    answer.isHelped = action.updatedAnswer.isHelped
                };
            });
            return {
                ...state
            };
        default:
            return state;
    }
};

export default QuestionAndAnswer;