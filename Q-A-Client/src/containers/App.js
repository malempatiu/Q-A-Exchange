import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import Questions from '../reducers/questions-reducer';
import Errors from '../reducers/errors-reducer';
import QuestionAndAnswer from '../reducers/question-answer-reducer';
import NavBar from './NavBar';
import HomePage from './HomePage';
import CreateQuestion from '../components/CreateQuestion';
import QuestionAnswer from '../components/QuestionAnswer';

const store = createStore(
  combineReducers({
    Questions,
    QuestionAndAnswer,
    Errors
  }),
  compose(applyMiddleware(thunk))
);

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
                <Route exact path="/addquestion" component={CreateQuestion} />
                <Route exact path="/question/:id" component={QuestionAnswer} />
              </Switch>
            </div>
          </BrowserRouter>
        </div>
      </Provider>
    );
  }
}

export default App;

