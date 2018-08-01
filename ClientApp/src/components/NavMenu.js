import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';
import {connect} from 'react-redux';

class NavMenu extends Component {

    constructor(props) {
        super(props);
    }

    render () {
     console.log("NAVMENU : ", this.props);

     return (
         <Navbar inverse fixedTop fluid collapseOnSelect>
             <Navbar.Header>
                 <Navbar.Brand>
                     <Link to={'/'}>Shop</Link>
                 </Navbar.Brand>
                 <button>
                     { this.props.user.Role ? "User menu" : "Login" }
                 </button>
                 <Navbar.Toggle />
             </Navbar.Header>
             <Navbar.Collapse>
                 <Nav>
                     <LinkContainer to={'/'} exact>
                         <NavItem>
                             <Glyphicon glyph='home' /> Home
                         </NavItem>
                     </LinkContainer>
                     <LinkContainer to={'/cart'}>
                         <NavItem>
                             <Glyphicon glyph='th-list' /> Cart
                         </NavItem>
                     </LinkContainer>
                     <LinkContainer to={'/dashboard'}>
                         <NavItem>
                             <Glyphicon glyph='th-list' />
                             <span>
                                 { this.props.user.Role ? "Dashboard" : "Authorization" }
                             </span>
                         </NavItem>
                     </LinkContainer>
                 </Nav>
             </Navbar.Collapse>
         </Navbar>
     )
    }

}

export default connect(
    state => state.dashboard,
    null
)(NavMenu);