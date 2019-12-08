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

  // componentWillMount() {
  //   this.getTickets();
  // }
  // componentDidMount() {
  //   this.getTickets();
  // }

  // ticketNumChanged = (event) => {
  //   this.setState({
  //     ticketNum: event.target.value
  //   });
  // }

  // getTickets = () => {
  //   fetch("/api/posts")
  //     .then(res => res.json())
  //     .then(posts => {
  //       posts.map((element, ii) => {
  //         console.log({ ...element });
  //         console.log(ii);
  //       });
  //       this.setState({
  //         loading: false,
  //         posts: posts.map((p, ii) => <Post {...p} key={ii} />),
  //       });
  //     })
  //     .catch(err => console.log("API ERROR: ", err));
  // }

  // // deleteSearchedPost = (id) => {
  // //   fetch("/api/posts/" + id, {
  // //     method: 'DELETE',
  // //     credentials: 'include',
  // //     headers: {
  // //       'Content-Type': 'application/json'
  // //     },
  // //   })
  // //     .then(res => {
  // //       if (res.ok) {
  // //         this.setState({
  // //           posts: null,
  // //           ticketNum: null,
  // //           deleted: true
  // //         })
  // //         return res.json();
  // //       }

  // //       throw new Error('Content validation');
  // //     })
  // //     .catch(err => {
  // //       this.setState({
  // //         error: true,
  // //       });
  // //     });
  // // }

  // deleteSuccess = () => this.setState({
  //   posts: null,
  //   ticketNum: null,
  //   deleted: true
  // });
  // deleteErr = () => {
  //   this.setState({
  //     error: true,
  //   });
  // };


  // searchPost = () => {
  //   if (this.state.ticketNum && isUuid(this.state.ticketNum))
  //     fetch("/api/posts/ticketNumber/" + this.state.ticketNum)
  //       .then(res => res.json())
  //       .then(posts => {
  //         console.log(posts.id);
  //         this.setState({
  //           loading: false,
  //           id: posts.id,
  //           // posts: <div><Post {...posts} key={posts.id} /> <button onClick={() => this.deleteSearchedPost(posts.id) }>delete</button></div>,
  //           posts: <SelectedPost {...posts} key={posts.id} deleteTicket={DeleteTicket} deleteSuccess={this.deleteSuccess} deleteError={this.deleteErr} />
  //         });
  //       })
  //       .catch(err => console.log("API ERROR: ", err));
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
          <div className="input-group col-9 col-md-7 col-lg-6 mb-5 mt-5">
            <input
              type="text"
              placeholder="Enter Ticket Number to find and/ update ticket"
              value={this.props.ticketNum}
              className="form-control mr-3 rounded"
              onChange={this.props.ticketNumChanged}
            />
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