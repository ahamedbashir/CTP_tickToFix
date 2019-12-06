import React from 'react';
import { Redirect } from 'react-router-dom';
import Post from '../components/Post';
import Loading from '../components/Loading';

class PostFormPage extends React.Component {
  state = {
    error: false,
    success: false,
    title: '',
    content: '',
    userName: '',
    contactNum: '',
    apt: '',
    severity: '',
    status: '',
    ticketNum: '',
    id: null,
    post: null
  }

  titleChanged = (event) => {
    this.setState({
      title: event.target.value
    });
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

  contactNumChanged = (event) => {
    this.setState({
      contactNum: event.target.value,
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
      body: JSON.stringify({ title: this.state.title, content: this.state.content, userName: this.state.userName, contactNum: this.state.contactNum, apt: this.state.apt })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }

        throw new Error('Content validation');
      })
      .then(post => {
        this.setState({
          success: true,
          ticketNum: post.ticketNum,
          id: post.id,
          post: post
        });
        console.log(post.ticketNum);
      })
      .catch(err => {
        this.setState({
          error: true,
        });
      });
  }

  updatePosts = (event) => {
    fetch("/api/posts/id", {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title: this.state.title, content: this.state.content, userName: this.state.userName, contactNum: this.state.contactNum, apt: this.state.apt })
    })
      .then(res => {
        if (res.ok) {
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
    if (this.state.success) {
      return (
        <div>
          <div className="card">Your Ticket # {this.state.ticketNum}</div>
          <Post {...this.state.post} />
          <button className="card" style={{backgroundColor:'black', color: 'white'}} onClick={() => window.print()}> Print Ticket</button>
          {/* <Redirect to={"/posts/" + this.state.id} /> */}
        </div>);
    }

    let errorMessage = null;
    if (this.state.error) {
      errorMessage = (
        <div className="alert alert-danger">
          "There was an error saving this post."
        </div>
      );
    }

    return (
      <div className="col-10 col-md-8 col-lg-7 mt-5">
        {errorMessage}
        <div className="input-group">
          <input
            type="text"
            placeholder="Add Ticket Title"
            value={this.state.title}
            className="form-control mr-3 rounded"
            onChange={this.titleChanged}
          />
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
            placeholder="Enter Phone Number"
            value={this.state.contactNum}
            className="form-control mr-3 rounded"
            onChange={this.contactNumChanged}
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