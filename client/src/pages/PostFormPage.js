import React from 'react';
import { Redirect } from 'react-router-dom';
import SelectedPost from '../components/SelectedPost';
import { DeleteTicket } from '../components/PostFunctions/DeleteTicket';
import Loading from '../components/Loading';
import { Button } from 'react-bootstrap';
import PostsListPage from './PostsListPage';

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
    post: null,
    deleted: false
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
          post: { ...post },
          deleted: false
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
          post: post,
          success: true,
        });
      })
      .catch(err => {
        this.setState({
          error: true,
        });
      });
  }

  deleteSuccess = () => {
    this.setState({
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
      appointmentStatus: '',
      id: null,
      post: null,
      deleted: true
    });
  };

  deleteErr = () => {
    this.setState({
      error: true,
    });
  };

  render() {
    if (this.state.success && !this.state.deleted) {
      console.log(this.state.post)
      return <SelectedPost {...this.state.post} deleteTicket={DeleteTicket} createSuccess={this.state.success} deleteSuccess={this.deleteSuccess} deleteError={this.deleteErr} />
    }

    let errorMessage = null;
    if (this.state.error) {
      errorMessage = this.state.deleted ?
        (
          <div className="alert alert-success">
            "Newly Created Ticket is deleted successfully"
          </div>
        ) :
        (
          <div className="alert alert-danger">
            "There was an error saving this Ticket."
        </div>
        );
    }

    return (
      <div className="container-fluid col-10 col-md-8 col-lg-7 mt-5">
        {errorMessage}
        <h2>New Ticket Form</h2>
        <div className="form-group text-left">
          <div className="form-group">
            <label for="inputTitle col">Ticket Title</label>
            <input
              type="text"
              placeholder="Add Ticket Title"
              id="inputTitle"
              value={this.state.title}
              className="form-control mr-3 rounded col"
              onChange={this.titleChanged}
            />
          </div>
          <div className="form-group">
            <label for="textAreaDescription">Ticket Description</label>
            <textarea
              className="form-control"
              id="textAreaDescription1"
              rows="3"
              value={this.state.content}
              onChange={this.contentChanged}
            />
          </div>
          <div className="form-row">
            <div class="form-group col-md-4">
              <label for="inputTel">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={this.state.userName}
                className="form-control mr-3 rounded"
                onChange={this.nameChanged}
              />
            </div>

            <div className="form-group col-md-4">
              <label for="inputTel">Phone Number</label>
              <input
                type="text"
                placeholder="Enter Phone Number"
                value={this.state.contactNum}
                id="inputTel"
                className="form-control mr-3 rounded"
                onChange={this.contactNumChanged}
              />
            </div>

            <div className="form-group col-md-4">
              <label for="inputApt">Apartment Number</label>
              <input
                type="text"
                placeholder="Enter your Apartment Number"
                value={this.state.apt}
                className="form-control mr-3 rounded"
                onChange={this.aptChanged}
              />
            </div>
          </div>

          <div className="form-row">
            <div class="form-group col-md-4">
              <label for="inputSeverity">Severity</label>
              <input
                type="text"
                placeholder="Enter Ticket Severity"
                // value={}
                className="form-control mr-3 rounded"
                // onChange={}
              />
            </div>

            <div className="form-group col-md-4">
              <label for="inputStatus">Status</label>
              <input
                type="text"
                placeholder="Enter Ticket Status"
                // value={}
                id="inputTel"
                className="form-control mr-3 rounded"
                // onChange={}
              />
            </div>

            <div className="form-group col-md-4">
              <label for="inputAppointment">Appointment Status</label>
              <input
                type="text"
                placeholder="Enter Appointment Status"
                // value={}
                className="form-control mr-3 rounded"
                // onChange={}
              />
            </div>
          </div>
          {/* <div className="form-group">
            <label for="exampleFormControlSelect1">Example select</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </select>
          </div> */}
          <Button variant="primary" className="m-*-auto" onClick={this.savePost}>Create Ticket</Button>
        </div>
      </div>
    );
  }
}

export default PostFormPage;