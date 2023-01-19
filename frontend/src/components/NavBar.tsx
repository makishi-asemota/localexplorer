import React from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.css";

export default function NavBar() {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Navbar.Brand>Local Explorer</Navbar.Brand>
        </Link>
        <Nav className="justify-self-end">
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Nav.Item className="text-light">Login</Nav.Item>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
