import React from 'react';
import logo from './media/logo.PNG';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import PostsListPage from './pages/PostsListPage';
import PostFormPage from './pages/PostFormPage';
import ShowPostPage from './pages/ShowPostPage';
import AboutUsPage from './pages/AboutUsPage';
import SearchPage from './pages/SearchPage';
import Post from './components/Post';
import SelectedPost from './components/SelectedPost';
import { Redirect } from 'react-router-dom';
import { DeleteTicket } from './components/PostFunctions/DeleteTicket';
// import { searchByTicketNumber, getTickets } from './components/PostFunctions/FetchTicket.js';
import { isUuid } from 'uuidv4';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button } from 'react-bootstrap';
import SignUpPage from './pages/SignUpPage';
import LoginPage from './pages/LoginPage';
import PrivateRoute from './components/PrivateRoute';
import AuthButton from './components/AuthButton';
import './App.css';
import auth from './services/auth';



function Navigation(props) {
  return (

    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark" sticky="top">
      <Navbar.Brand href="/"> <img src={logo} id="homeLogo" alt="Tick To Fix Logo"></img>TickToFix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav nav-right">
        <Nav className="mr-auto">
          {sessionStorage.isAuthenticated !== "true" ?
            <Nav.Link href="/posts/guest/new">Create Ticket</Nav.Link> :
            <Nav.Link href="/posts/new">Create Ticket</Nav.Link>
          }
          <Nav.Link href="/about-us">About Us</Nav.Link>
        </Nav>
        <Form inline className="buttonInside">
            <input type="text" id="searchParam" placeholder="Find Tickets" className="searchField mr-sm-2 form-control" onChange={(event) => props.searchAllTicket(event.target.value)} />
            <Button className = "clearButton " variant="outline-secondary" onClick={() => { document.getElementById('searchParam').value = ''; props.searchAllTicket('') }}>X</Button>
        </Form>
        <Nav>
          <AuthButton />
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}


class App extends React.Component {
  state = {
    posts: null,
    searchedPost: false,
    loading: true,
    ticketNum: '',
    deleted: false,
    allTickets: '',
    searchParam: ''
  }

  componentDidMount() {
    this.getTickets();
    console.log(auth.isAuthenticated)
  };

  ticketNumChanged = (event) => {
    this.setState({
      ticketNum: event.target.value
    });
  };

  getTicketSuccess = (posts) => {
    this.setState({
      searchedPost: false,
      loading: false,
      posts: posts.map((p, ii) => <Post {...p} key={ii} />),
      allTickets: posts
    });
  }
  searchTicketSuccess = (posts) => {
    this.setState({
      loading: false,
      searchedPost: true,
      id: posts.id,
      posts: <SelectedPost {...posts} key={posts.id} deleteTicket={DeleteTicket} deleteSuccess={this.deleteSuccess} deleteError={this.deleteErr} />
    });

  }
  deleteSuccess = () => this.setState({
    posts: null,
    searchedPost: false,
    ticketNum: null,
    deleted: true
  });

  afterDeleteSuccess = () => {
    this.getTickets();
    this.setState({ deleted: false });
  }
  deleteErr = () => {
    this.setState({
      error: true,
    });
  };

  getTickets = () => {
    fetch("/api/posts")
      .then(res => res.json())
      .then(posts => {
        this.setState({
          loading: false,
          posts: posts.map((p, ii) => <Post {...p} key={ii} />),
          allTickets: posts
        });
      })
      .catch(err => console.log("API ERROR: ", err));
  }
  searchByTicketNumber = () => {
    if (this.state.ticketNum && isUuid(this.state.ticketNum))
      fetch("/api/posts/ticketNumber/" + this.state.ticketNum)
        .then(res => res.json())
        .then(posts => {
          console.log('posts', posts);
          this.setState({
            loading: false,
            id: posts.id,
            posts: <SelectedPost {...posts} key={posts.id} deleteTicket={DeleteTicket} deleteSuccess={this.deleteSuccess} deleteError={this.deleteErr} />
          });
        })
        .catch(err => console.log("API ERROR: ", err));
    else {
      this.setState({
        posts: <div className="card alert alert-danger col-6">
          <div className="h4 card-title">Invalid Ticket Number
          </div>
          <Button variant="info" className="mt-5" href="/">Click to View All Tickets</Button>
        </div>
      })
    }
  };

  searchAllTicket = (searchParam) => {
    searchParam = searchParam.toLocaleLowerCase();
    let posts = [];
    this.state.allTickets.map(obj => {
      for (let key in obj) {
        let str = String(obj[key]).toLocaleLowerCase();
        if (str && str.includes(searchParam)) {
          posts.push(obj);
          return;
        }
      };
    })
    if (posts.length === 0) {
      this.setState({
        posts: <div className="alert alert-danger">
          No Ticket found
        </div>
      });
    } else {
      this.setState({ posts: posts.map((p, ii) => <Post {...p} key={ii} />) });
    }

    console.log(posts);

  }
  render() {
    return (
      <Router>
        <Navigation searchAllTicket={this.searchAllTicket} />
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <Switch>
              <Route path="/login" component={LoginPage} />
              <Route path="/signup" component={SignUpPage} />
              <PrivateRoute path="/posts/new" component={PostFormPage} />
              <Route path="/posts/guest/new" component={PostFormPage} />
              <Route path="/posts/ticketNumber/:ticketNum" component={ShowPostPage} />
              <Route path="/posts/:id" component={ShowPostPage} />
              <Route path="/about-us" component={AboutUsPage} />
              <Route path="/search-page" component={SearchPage} />
              {/* <Route path="/" component={PostsListPage} /> */}
              <Route path="/" render={(props) => <PostsListPage
                ticketNum={this.state.ticketNum}
                ticketNumChanged={this.ticketNumChanged}
                searchPost={this.searchByTicketNumber}
                searchedPost={this.state.searchedPost}
                getTickets={this.getTickets}
                posts={this.state.posts}
                loading={this.state.loading}
                deleted={this.state.deleted}
                afterDeleteSuccess={this.afterDeleteSuccess} />}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
