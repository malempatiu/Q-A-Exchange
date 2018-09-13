import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUserQuestions, removeError} from '../actions/actions';
import { Link } from 'react-router-dom';

export class UserQuestions extends Component {
    state = {
        text: ''
    }
    componentDidMount() {
        this.props.removeError();
        this.props.fetchUserQuestions();
    };
    handleUserSearch = (e) => {
        this.setState({ text: e.target.value });
    };
    render() {
        const { username, questions, error } = this.props;
        return (
            <div className="conatiner homepage">
                <h1 className="text-center"><span className="font-weight-bold text-dark">{username}</span> your questions</h1>
                <div className="container">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {!questions.length && <div className="alert alert-info">You asked zero questions</div>}
                    {questions.map((question) => {
                        return <div key={question._id} className="row">
                            <div className="col-lg-12 col-md-12 col-sm-12">
                                <div className="card">
                                    <Link to={`/question/${question._id}`} id={question._id} className="card-body text-primary">
                                        {question.text}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        questions: state.UserAskedQuestions.userQuestions,
        error: state.Errors.error,
        username: state.CurrentUser.user.username
    };
}

export default connect(mapStateToProps, { fetchUserQuestions, removeError })(UserQuestions);