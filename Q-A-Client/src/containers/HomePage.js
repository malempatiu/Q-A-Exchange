import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchQuestions } from '../actions/actions';
import { Link } from 'react-router-dom';

class HomePage extends Component {
    state = {
        text: ''
    }
    componentDidMount() {
        this.props.fetchQuestions();
    };
    handleUserSearch = (e) => {
        this.setState({ text: e.target.value });
    };
    render() {
        const { questions, error } = this.props;
        let newQuestions;
        if (this.state.text.length > 0) {
            newQuestions = questions.filter((question) => {
                return question.createdBy.toLowerCase().includes(this.state.text.toLowerCase());
            });
        } else {
            newQuestions = questions;
        }
        return (
            <div className="conatiner homepage">
                <div className="jumbotron text-center">
                        <h1>Welcome to Staffbase Q & A</h1>
                        <p className="lead">View all top questions and answers raised by employee's</p>
                        <input type="text" className="searchInput" placeholder="search your Q's by email" onChange={this.handleUserSearch} style={{ margin: '8px' }} />
                </div>
                <div className="container">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {newQuestions.map((question) => {
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
        questions: state.Questions.questions,
        error: state.Errors.error
    };
}

export default connect(mapStateToProps, { fetchQuestions })(HomePage);