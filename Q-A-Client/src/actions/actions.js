import { SET_CURRENT_USER, GET_QUESTIONS, ADD_ERROR, REMOVE_ERROR, ADD_QUESTION, GET_QUESTION, ADD_ANSWER, GET_USER_QUESTIONS } from './action-constants';

/*
** Authentication Related Actions
*/
export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        user
    };
}

export const logoutUser = () => {
    return (dispatch) => {
        localStorage.clear();
        dispatch(setCurrentUser({}));
    };
};

/*
** Q-A Realted Actions
*/
export const getQuestions = (questions) => {
    return {
        type: GET_QUESTIONS,
        questions
    };
};

export const getUserQuestions = (userQuestions) => {
    return {
        type: GET_USER_QUESTIONS,
        userQuestions
    };
}

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

/*
** Error related actions
*/
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

/*
** Authentication Asynch Actions
*/
export const userAuthentication = (userAuthType, userData) => {
    return (dispatch) => {
        return fetch(`http://localhost:8081/api/user/${userAuthType}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.error) {
                    dispatch(addError(data.error));
                } else {
                    const { token, ...rest } = data;
                    localStorage.setItem('userJwtToken', token);
                    dispatch(setCurrentUser({ ...rest }));
                }
            })
            .catch((err) => console.log(err));
    }
};

/*
** Q-A Asynch Actions
*/
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

export const fetchUserQuestions = () => {
    return (dispatch, getState) => {
        const { CurrentUser } = getState();
        const token = localStorage.getItem('userJwtToken');
        return fetch(`http://localhost:8081/api/user/${CurrentUser.user._id}/questions`, {
            headers: {'authorization': `Bearer ${token}`}
        })
        .then((response) => response.json())
        .then((data) => {
            if (data.error) {
                dispatch(addError(data.error));
            } else {
                dispatch(getUserQuestions(data.userQuestions));
            }
        })
        .catch((err) => console.log(err));
    }
}

export const createQuestion = (questionToCreate) => {
    return (dispatch, getState) => {
        const { CurrentUser } = getState();
        const token = localStorage.getItem('userJwtToken');
        return fetch(`http://localhost:8081/api/user/${CurrentUser.user._id}/questions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
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
    return (dispatch, getState) => {
        const { CurrentUser } = getState();
        const token = localStorage.getItem('userJwtToken');
        return fetch(`http://localhost:8081/api/user/${CurrentUser.user._id}/questions/${id}/answer`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
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