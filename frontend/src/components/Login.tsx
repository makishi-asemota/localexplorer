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

  async function handleSubmit(e: any) {
    e.preventDefault();
    try {
        const {data} = await axios.post<UserRegistration>(
            "http//localhost:8080/register",
            {username: username, password: password},
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
        return data
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
          } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
          }
        }
    }
  };

  return (
    <Container className="d-flex align-items-center">
      <h1>Register</h1>
      <Form onSubmit={handleSubmit()}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={(e) => setUsername(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Form.Text id="passwordHelpBlock" muted>
            Your password must be 8-20 characters long, contain letters and
            numbers, and must not contain spaces, special characters, or emoji.
          </Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}
