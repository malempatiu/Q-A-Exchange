import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createQuestion} from '../actions/actions';
import {Redirect} from 'react-router-dom';

export class CreateQuestion extends Component {
    state = {
        text: ''
    };
    handleCreateQuestion = (e) => {
      this.setState({text: e.target.value});
    };
    handleFormSubmit = (e) => {
       e.preventDefault();
       const {text} = this.state;
       this.props.createQuestion({text, createdBy:this.props.email});
       const {error} = this.props;
       if(!error){
         this.props.history.push('/');
       } 
    };
    render() {
        const {error, isAuthenticated} = this.props;
        if(!isAuthenticated){
            return <Redirect to='/signin' />
         };
        return (
            <div className="container addquestion-cont">
                <h4 className="text-center">Ask a question</h4>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12">
                        <form onSubmit={this.handleFormSubmit}>
                            <div className="form-group">
                                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={this.handleCreateQuestion}></textarea>
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary form-control">Create a Question</button>
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
       error: state.Errors.error,
       isAuthenticated: state.CurrentUser.isAuthenticated,
       email: state.CurrentUser.user.email
    }
};

export default connect(mapStateToProps, {createQuestion})(CreateQuestion);
