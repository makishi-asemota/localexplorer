import axios, { AxiosResponse } from "axios";
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

  const handleSubmit = () => {
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
      .then((res: AxiosResponse) => {
        if (res.data === "success") {
          window.location.href = "/";
        }
      });
  };

  return (
    <Container className="d-flex flex-column px-5 ">
      <br></br>
      <h1 className="text-center fw-bold my-6">Register</h1>
      <br></br>
      <Form
        onSubmit={handleSubmit}
        className="border border-primary rounded p-3 bg-light"
      >
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Username"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div className="text-center">
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </div>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="text"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center">
            <Form.Text id="passwordHelpBlock" muted>
              Your password must be 10-15 characters long, contain letters and
              numbers, and must not contain spaces or special characters.
            </Form.Text>
          </div>
        </Form.Group>
        <br></br>
        <div className="d-flex justify-content-center">
          <Button variant="primary" type="submit">
            Sign up
          </Button>
        </div>
      </Form>
    </Container>
  );
}
