import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getQuestionAndAnswer, createAnswer, upgradeAnswer } from '../actions/actions';
import Moment from 'react-moment';

class QuestionAnswer extends Component {
    state = {
        answer: '',
        helped: false
    };
    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getQuestionAndAnswer(id);
    };
    handleQuestionAnswer = (e) => {
        this.setState({ answer: e.target.value });
    };
    handleHelpedMe = (e) => {
       let id = e.target.value;
       this.setState({helped: !this.state.helped}, () => {
           this.handleUpdateAnswer(id);
       });
    };
    handleUpdateAnswer = (id) => {
        this.props.upgradeAnswer({isHelped: this.state.helped}, id);
    };
    handleFormSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        const { answer } = this.state;
        this.props.createAnswer({ answer, createdBy: this.props.email }, id);
        document.getElementById("answerform").reset();
    };
    render() {
        const { data, error, isAuthenticated} = this.props;
        return (
            <div className="container answers-cont">
                {error && <div className="alert alert-danger">{error}</div>}
                <h3 className="font-weight-bold">{data.text}</h3>
                <p className="text-muted">Asked By: {data.createdBy} <br />On:
                    <Moment className="text-muted" format="Do MMM YYYY">
                        {data.createdAt}
                    </Moment>
                </p>
                <hr />
                <h3 className="font-weight-bold">Answers</h3>
                {data.answers.map((qAnswer, i) => {
                    return <div key={qAnswer._id}>
                        <div className="card">
                            <div className="row">
                                <div className="col-lg-12 col-md-12 col-sm-12">
                                    <div className="card-body">
                                        <div className="text-right">
                                            {qAnswer.isHelped && <p className="text-success"><i className="fas fa-check fa-2x"></i></p>}
                                            {isAuthenticated && <button className="btn btn-outline-info" value={qAnswer._id} onClick={this.handleHelpedMe}>{qAnswer.isHelped ? 'Not Helped' : 'Helped Me'}</button>}
                                        </div>
                                        <p className="text-dark text-justify">{qAnswer.answer}</p>
                                        <p className="text-muted">Answered By: {qAnswer.createdBy} <br />On:
                                        <Moment className="text-muted" format="Do MMM YYYY">
                                                {qAnswer.createdAt}
                                            </Moment>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                })}
                <hr />
                {isAuthenticated &&
                    <div>
                        <h3 className="font-weight-bold post-answer">Your Answer</h3>
                        <div className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <form id="answerform" onSubmit={this.handleFormSubmit}>
                                    <div className="form-group">
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleQuestionAnswer}></textarea>
                                    </div>
                                    <div className="form-group text-center">
                                        <button type="submit" className="btn btn-primary form-control">Post Answer</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.QuestionAndAnswer,
        error: state.Errors.error,
        isAuthenticated: state.CurrentUser.isAuthenticated,
        email: state.CurrentUser.user.email
    };
};

export default connect(mapStateToProps, { getQuestionAndAnswer, createAnswer, upgradeAnswer })(QuestionAnswer);

