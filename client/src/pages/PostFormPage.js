import React from 'react';
// import { Redirect } from 'react-router-dom';
import SelectedPost from '../components/SelectedPost';
import { DeleteTicket } from '../components/PostFunctions/DeleteTicket';
// import Loading from '../components/Loading';
import { Button } from 'react-bootstrap';
// import PostsListPage from './PostsListPage';

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
    appointmentStatus: '',
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

  valueChangeHandler = (name) => {
    return (event) => {
      let { value } = event.target;
      this.setState({ [name]: value });
    }
  }

  savePost = (event) => {
    fetch("/api/posts/", {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        content: this.state.content,
        userName: this.state.userName,
        contactNum: this.state.contactNum,
        apt: this.state.apt,
        severity: this.state.severity,
        status: this.state.status,
        appointmentStatus: this.state.appointmentStatus
      })
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
        <h2>{sessionStorage.isAuthenticated !== "true" ? "New Guest Ticket Form" : "New Ticket Form"}</h2>
        <div className="form-group text-left">
          <div className="form-group">
            <label htmlFor="inputTitle col">Ticket Title</label>
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
            <label htmlFor="textAreaDescription">Ticket Description</label>
            <textarea
              className="form-control"
              id="textAreaDescription1"
              rows="3"
              value={this.state.content}
              onChange={this.contentChanged}
            />
          </div>
          <div className="form-row">
            <div className="form-group col-md-4">
              <label htmlFor="inputName">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={this.state.userName}
                className="form-control mr-3 rounded"
                onChange={this.nameChanged}
              />
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="inputTel">Phone Number</label>
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
              <label htmlFor="inputApt">Apartment Number</label>
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
            <div className="form-group col-md-4">
              <label htmlFor="inputSeverity">Severity</label>
              <select className="form-control" id="inputSeverity" value={this.state.severity} onChange={this.valueChangeHandler('severity')} >
                <option value="">SelectTicket Severity</option>
                <option value="Critical/Major">Critical/Major</option>
                <option value="Moderate/Medium">Moderate/Medium</option>
                <option value="Minor/Low">Minor/Low</option>
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="inputStatus">Status</label>
              <select className="form-control" id="inputStatus" value={this.state.status} onChange={this.valueChangeHandler('status')} >
                <option value="">Select Ticket Status</option>
                <option value="Resolved/Closed">Resolved/Closed</option>
                <option value="Not Solved/Open">Not Solved/Open</option>
              </select>
            </div>

            <div className="form-group col-md-4">
              <label htmlFor="inputAppointment">Appointment Status</label>
              <input
                type="text"
                placeholder="Enter Appointment Status"
                // value={}
                className="form-control mr-3 rounded"
              // onChange={}
              />
            </div>
          </div>
          <div className="text-center"><Button variant="primary" className="m-*-auto" onClick={this.savePost}>Submit Ticket</Button></div>
          
        </div>
      </div>
    );
  }
}

export default PostFormPage;