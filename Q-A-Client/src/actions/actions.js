import { GET_QUESTIONS, ADD_ERROR, REMOVE_ERROR, ADD_QUESTION, GET_QUESTION, ADD_ANSWER} from './action-constants';

export const getQuestions = (questions) => {
    return {
        type: GET_QUESTIONS,
        questions
    };
};

export const getQuestion = (question) => {
    return {
        type: GET_QUESTION,
        question
    };
};

export const addAnswer = (answer) => {
    return {
        type: ADD_ANSWER,
        answer
    };
}

export const addQuestion = (question) => {
    return {
        type: ADD_QUESTION,
        question
    };
};

export const addError = (error) => {
    return {
        type: ADD_ERROR,
        error
    };
};

export const removeError = () => {
    return {
        type: REMOVE_ERROR
    };
};

export const fetchQuestions = () => {
    return (dispatch) => {
        return fetch('http://localhost:8081/api/questions')
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    dispatch(addError(data.error));
                } else {
                    dispatch(getQuestions(data.questions));
                }
            })
            .catch((err) => console.log(err));
    }
};

export const createQuestion = (questionToCreate) => {
    return (dispatch) => {
        return fetch('http://localhost:8081/api/questions', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(questionToCreate)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    dispatch(addError(data.error));
                } else {
                    dispatch(addQuestion(data.createdQuestion));
                }
            })
            .catch((err) => console.log(err));
    }
};

export const getQuestionAndAnswer = (questionID) => {
    return (dispatch) => {
        return fetch(`http://localhost:8081/api/questions/${questionID}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    dispatch(addError(data.error));
                } else {
                    dispatch(getQuestion(data.question));
                }
            })
            .catch((err) => console.log(err));
    }

};

export const createAnswer = (answerText, id) => {
    return (dispatch) => {
        return fetch(`http://localhost:8081/api/answers/${id}`, {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(answerText)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    dispatch(addError(data.error));
                } else {
                    dispatch(addAnswer(data.answer));
                }
            })
            .catch((err) => console.log(err));
    }
};