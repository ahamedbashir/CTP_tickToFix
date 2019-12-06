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
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './App.css';


function Navigation(props) {
  return (
    <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark"  sticky="top">
      <Navbar.Brand href="posts"> <img src={logo} id="homeLogo" alt="Tick To Fix Logo"></img>TickToFix</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/post/new">Create Ticket</Nav.Link>
          <Nav.Link href="/about-us">About Us</Nav.Link>
          <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          <Nav.Link href="#deets">More deets</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    // <nav className="navbar navbar-expand-sm navbar-dark bg-dark shadow mb-3 fixed-top">
    //   <Link className="navbar-brand" to="/">
    //     <img src={logo} id="homeLogo" alt="Tick To Fix Logo"></img>
    //     TickToFix</Link>
    //   <ul className="navbar-nav mr-auto">
    //     <li className="nav-item">
    //       <NavLink className="nav-link" exact to="/posts/new">
    //         Create a Ticket
    //       </NavLink>
    //     </li>
    //     <li className="nav-item">
    //       <NavLink className="nav-link" exact to="/about-us">
    //         About Us
    //       </NavLink>
    //     </li>
    //     <li className="nav-item">
    //       <NavLink className="nav-link" exact to = "/search-page">
    //         Search
    //       </NavLink>
    //     </li>
    //   </ul>
    // </nav>
  );
}


class App extends React.Component {
  render() {
    return (
      <Router>
        <Navigation />
        <div className="container-fluid text-center">
          <div className="row justify-content-center">
            <Switch>
              <Route path="/posts/new" component={PostFormPage} />
              <Route path="/posts/ticketNumber/:ticketNum" component={ShowPostPage} />
              <Route path="/posts/:id" component={ShowPostPage} />
              <Route path="/about-us" component={AboutUsPage} />
              <Route path="/search-page" component={SearchPage} />
              <Route path="/" component={PostsListPage} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}


export default App;
