import React from "react";
import { Navbar as NavbarBS, Container, Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import ShoppingCard from "./shoppingCard";

const Navbar = () => {
  return (
    <NavbarBS className="bg-white shadow-sm mb-3">
      <Container>
        <Nav>
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          <Nav.Link to="/store" as={NavLink}>
            Store
          </Nav.Link>
          <Nav.Link to="/about" as={NavLink}>
            About
          </Nav.Link>
        </Nav>
        <ShoppingCard />
      </Container>
    </NavbarBS>
  );
};

export default Navbar;
