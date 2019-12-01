import React from 'react';
import { Redirect } from 'react-router-dom';

class PostFormPage extends React.Component {
  state = {
    error: false,
    success: false,
    content: '',
    userName: '',
    apt: '',
    severity: '',
    status: ''
  }

  contentChanged = (event) => {
    this.setState({
      content: event.target.value
    });
  }

  nameChanged = (event) => {
    this.setState({
      userName: event.target.value
    });
  }

  aptChanged = (event) => {
    this.setState({
      apt: event.target.value
    });
  }

  savePost = (event) => {
    fetch("/api/posts/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({content: this.state.content, userName: this.state.userName, apt: this.state.apt})
    })
      .then(res => {
        if(res.ok) {
          return res.json()
        }

        throw new Error('Content validation');
      })
      .then(post => {
        this.setState({
          success: true,
        });
      })
      .catch(err => {
        this.setState({
          error: true,
        });
      });
  }

  render() {
    if(this.state.success) return <Redirect to="/" />;

    let errorMessage = null;
    if(this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "There was an error saving this post."
        </div>
      );
    }

    return (
      <div className="col-10 col-md-8 col-lg-7">
        { errorMessage }
        <div className="input-group">
          <input 
            type="text" 
            placeholder="Add Issue details..." 
            value={this.state.content}
            className="form-control mr-3 rounded"
            onChange={this.contentChanged}
          />
          <input 
            type="text" 
            placeholder="Enter your name" 
            value={this.state.userName}
            className="form-control mr-3 rounded"
            onChange={this.nameChanged}
          />
          
          <input 
            type="text" 
            placeholder="Apartment Number" 
            value={this.state.apt}
            className="form-control mr-3 rounded"
            onChange={this.aptChanged}
          />
          
          <button className="btn btn-primary" onClick={this.savePost}>Save Post</button>
        </div>
      </div>
    );
  }
}

export default PostFormPage;