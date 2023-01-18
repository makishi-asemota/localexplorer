import axios from "axios";
import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export interface UserRegistration {
  email: string;
  password: string;
}

export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/register",
        {
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.data === "success") {
          window.location.href = "/";
        }
      });
  };

  return (
    <Container className="d-flex flex-column">
      <h1 className="text-center fw-bold my-6">Register</h1>
      <br></br>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Sign up
        </Button>
      </Form>
    </Container>
  );
}
