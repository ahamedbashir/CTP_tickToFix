import React from 'react';
import Post from '../components/Post';
import Loading from '../components/Loading';


class PostsListPage extends React.Component {
  state = {
    posts: [],
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

  searchPost = (ticketNum) => {

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