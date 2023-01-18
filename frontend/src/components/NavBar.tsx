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
          <Navbar.Brand href="/">Local Explorer</Navbar.Brand>
        </Link>
        <Nav className="justify-self-end">
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Nav.Link href="/Shop">Login</Nav.Link>
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
}
