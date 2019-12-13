import React from 'react';
import Post from '../components/Post';
import SelectedPost from '../components/SelectedPost';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';
import { DeleteTicket } from '../components/PostFunctions/DeleteTicket.js';
import { isUuid } from 'uuidv4';
import { Button } from 'react-bootstrap';

class PostsListPage extends React.Component {
  // state = {
  //   posts: null,
  //   loading: true,
  //   ticketNum: '',
  //   deleted: false
  // }


  render() {
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
                id = "ticketSearchField"
                className="form-control mr-3 rounded"
                onChange={this.props.ticketNumChanged}
                required
              />
              {/* <Button className = "clearBu" variant="outline-primary" onClick={() => { document.getElementById('ticketSearchField').value = '';}} style={{position:'inherit', right:'50px'}}>X</Button> */}
              <Button className="btn btn-primary" onClick={this.props.searchPost}>Search Ticket</Button>
            </div>
          </div>
          <div className="row justify-content-center">
            {this.props.posts}
          </div>
        </div>
      );
    }
  }

  export default PostsListPage;