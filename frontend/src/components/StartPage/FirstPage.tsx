import React from "react";
import "./styles.css";
import { Form } from "react-bootstrap";

export default function FirstPage() {
  return (
    <div className="home d-flex flex-column align-items-center">
      <br></br>
      <h1 className="fw-bold text-light">Local Explorer</h1>
      <Form className="homeForm">
        <h4 className="start text-light fw-bold text-center">
          Where are you Located?
        </h4>
        <br></br>
        <Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="Enter City/State" />
          </Form.Group>
        </Form.Group>
      </Form>
    </div>
  );
}
