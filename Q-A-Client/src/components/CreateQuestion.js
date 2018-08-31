import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createQuestion} from '../actions/actions';

class CreateQuestion extends Component {
    state = {
        text: '',
        createdBy: ''
    };
    handleCreateQuestion = (e) => {
      this.setState({text: e.target.value});
    };
    handleUsername = (e) => {
       this.setState({createdBy: e.target.value});
    };
    handleFormSubmit = (e) => {
       e.preventDefault();
       const {text, createdBy} = this.state;
       this.props.createQuestion({text, createdBy});
       const {error} = this.props;
       if(!error){
         this.props.history.push('/');
       } 
    };
    render() {
        const {error} = this.props;
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
                            <div className="form-group">
                                <input className="form-control" type="text" placeholder="enter email address" onChange={this.handleUsername} /> 
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
       error: state.Errors.error
    }
};

export default connect(mapStateToProps, {createQuestion})(CreateQuestion);
