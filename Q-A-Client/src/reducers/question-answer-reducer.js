import { GET_QUESTION, ADD_ANSWER} from '../actions/action-constants';

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
        default:
            return state;
    }
};

export default QuestionAndAnswer;