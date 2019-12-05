import React from 'react';
import Post from '../components/Post';
import SelectedPost from '../components/SelectedPost';
import Loading from '../components/Loading';
import { Redirect } from 'react-router-dom';


class PostsListPage extends React.Component {
  state = {
    posts: null,
    loading: true,
    ticketNum: '',
  }

  componentDidMount() {
    fetch("/api/posts")
      .then(res => res.json())
      .then(posts => {
        posts.map((element, ii) => {
          console.log({ ...element });
          console.log(ii);
        });
        this.setState({
          loading: false,
          posts: posts.map((p, ii) => <Post {...p} key={ii} />),
        });
      })
      .catch(err => console.log("API ERROR: ", err));
  }
  
  ticketNumChanged = (event) => {
    this.setState({
      ticketNum: event.target.value
    });
  }

  deleteSearchedPost = (id) => {
    fetch("/api/posts/"+id, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.ok) {
          this.setState({
            posts: null,
            ticketNum: null
          })
          return res.json();
          return <Redirect to={"/posts/"} />
        }

        throw new Error('Content validation');
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
  
  searchPost = () => {
    fetch("/api/posts/ticketNumber/"+this.state.ticketNum)
      .then(res => res.json())
      .then(posts => {
        console.log(posts.id);
        this.setState({
          loading: false,
          id: posts.id,
          // posts: <div><Post {...posts} key={posts.id} /> <button onClick={() => this.deleteSearchedPost(posts.id) }>delete</button></div>,
          posts: <SelectedPost {...posts} key={posts.id} deleteTicket={this.deleteSearchedPost}/>
        });
      })
      .catch(err => console.log("API ERROR: ", err));
  }

  updatePost = () => {
    
  }

  render() {
    if (this.state.loading) {
      return <Loading />;
    }

    return (
      <div className="container-fluid text-center">
        <div className="row justify-content-center">
          <div className="input-group col-9 col-md-7 col-lg-6 mb-5">
            <input
              type="text"
              placeholder="Enter Ticket Number to find and/ update ticket"
              value={this.state.ticketNum}
              className="form-control mr-3 rounded"
              onChange={this.ticketNumChanged}
            />
            <button className="btn btn-primary" onClick={this.searchPost}>Search Ticket</button>
          </div>
        </div>
        <div className="row justify-content-center">
          {this.state.posts}
        </div>
      </div>
    );
  }
}

export default PostsListPage;