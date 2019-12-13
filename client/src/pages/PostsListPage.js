import React from 'react';
import Post from '../components/Post';
import SelectedPost from '../components/SelectedPost';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';
import { DeleteTicket } from '../components/PostFunctions/DeleteTicket.js';
import { isUuid } from 'uuidv4';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

class PostsListPage extends React.Component {
  // state = {
  //   posts: null,
  //   loading: true,
  //   ticketNum: '',
  //   deleted: false
  // }


  render() {
    let errorMsg = this.props.ticketNumError ?
      <div className="col-10 col-md-8 col-lg-7 mt-5">
        <div className="card mb-4 shadow alert alert-danger">"Invalid Ticket Number"</div>
      </div>: null;
    if (this.props.loading) {
      return <Loading />;
    }

    if (this.props.deleted) {
      // this.props.getTickets();
      // this.props.setState({ deleted: false });
      this.props.afterDeleteSuccess();
      return <Redirect to={"/posts/"} />
    }

    return (
      <div className="container-fluid text-center">
        <div className="row justify-content-center">
          <div className="input-group col-8 col-md-7 col-lg-6 mb-5 mt-5">
            <input
              type="text"
              placeholder="Enter Ticket Number to find and/ update ticket"
              value={this.props.ticketNum}
              id="ticketSearchField"
              className="form-control mr-3 rounded"
              onChange={(event)=>this.props.ticketNumChanged(event.target.value)}
              required
              style={{paddingRight: '40px'}}
            />
            <Button className = "clearButton" variant="outline-light" onClick={() => { document.getElementById('ticketSearchField').value = '';}} style={{color:'black', position:'inherit', zIndex: '100', right:'50px', border:'none'}}>X</Button>
            <Button variant='primary' onClick={this.props.searchPost}>Search Ticket</Button>
          </div>
        </div>
        <div className="row justify-content-center">
          {errorMsg}
          {this.props.posts}
        </div>
      </div>
    );
  }
}

export default PostsListPage;