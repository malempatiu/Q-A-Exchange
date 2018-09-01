import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import jwtDecode from 'jwt-decode';
import { Provider } from 'react-redux';
import Questions from '../reducers/questions-reducer';
import Errors from '../reducers/errors-reducer';
import QuestionAndAnswer from '../reducers/question-answer-reducer';
import CurrentUser from '../reducers/current-user-reducer';
import UserAskedQuestions from '../reducers/user-questions-reducer';
import NavBar from './NavBar';
import HomePage from './HomePage';
import CreateQuestion from '../components/CreateQuestion';
import QuestionAnswer from '../components/QuestionAnswer';
import AuthForm from '../components/AuthForm';
import UserQuestions from '../components/UserQuestions';
import {removeError, setCurrentUser} from '../actions/actions';

const store = createStore(
  combineReducers({
    CurrentUser,
    Questions,
    QuestionAndAnswer,
    UserAskedQuestions,
    Errors
  }),
  compose(applyMiddleware(thunk))
);

if(localStorage.userJwtToken){
  try{
     store.dispatch(setCurrentUser(jwtDecode(localStorage.userJwtToken)));
  }catch(error){
      store.dispatch(setCurrentUser({}));
  }
};


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app-cont">
          <BrowserRouter>
            <div>
              <NavBar />
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/signup" render={() => {
                  store.dispatch(removeError());
                  return (
                    <AuthForm signUp btnText="Sign Up" heading="Exchange Q & A by joining." />
                  );
                }
                } />
                <Route exact path="/signin" render={() => {
                  store.dispatch(removeError());
                  return (
                    <AuthForm btnText="Log In" heading="Welcome Back to Q-A-Exchange" />
                  );
                }
                } />
                <Route exact path="/addquestion" component={CreateQuestion} />
                <Route exact path="/question/:id" component={QuestionAnswer} />
                <Route exact path="/userquestions" component={UserQuestions} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;

