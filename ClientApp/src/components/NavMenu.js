﻿import React from 'react';
import { Link } from 'react-router-dom';
import { Glyphicon, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './NavMenu.css';

export default props => (
  <Navbar inverse fixedTop fluid collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <Link to={'/'}>Shop</Link>
      </Navbar.Brand>
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
          <LinkContainer to={'/admin'}>
              <NavItem>
                  <Glyphicon glyph='th-list' /> Admin
              </NavItem>
          </LinkContainer>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);
