import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestionAndAnswer, createAnswer } from '../actions/actions';
import Moment from 'react-moment';

class QuestionAnswer extends Component {
    state = {
        answer: '',
        createdBy: ''
    };
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getQuestionAndAnswer(id);
    };
    handleQuestionAnswer = (e) => {
         this.setState({answer: e.target.value});
    };
    handleUsername = (e) => {
         this.setState({createdBy: e.target.value});
    };
    handleFormSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        this.props.createAnswer(this.state, id);
        document.getElementById("answerform").reset();
    };
    render() {
        const { data, error } = this.props;
        return (
            <div className="container answers-cont">
                {error && <div className="alert alert-danger">{error}</div>}
                <h3 className="font-weight-bold">{data.text}</h3>
                <p className="text-muted">CreatedBy: {data.createdBy}</p>
                <p className="text-muted">
                    <Moment className="text-muted" format="Do MMM YYYY">
                        {data.createdAt}
                    </Moment>
                </p>
                <hr />
                <h3 className="font-weight-bold">Answers</h3>
                {data.answers.map((qAnswer) => {
                    return <div key={qAnswer._id} className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12">
                            <div className="card">
                                <div className="card-body">
                                    <p className="text-dark">{qAnswer.answer}</p>
                                    <p className="text-muted">Created By: {qAnswer.createdBy}</p>
                                    <Moment className="text-muted" format="Do MMM YYYY">
                                        {qAnswer.createdAt}
                                    </Moment>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                <hr />
                <h3 className="font-weight-bold post-answer">Your Answer</h3>
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <form id="answerform" onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleQuestionAnswer}></textarea>
                            </div>
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="enter email address" onChange={this.handleUsername} /> 
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary form-control">Post Answer</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.QuestionAndAnswer,
        error: state.Errors.error
    };
};

export default connect(mapStateToProps, { getQuestionAndAnswer, createAnswer })(QuestionAnswer);