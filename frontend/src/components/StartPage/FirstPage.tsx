import React from "react";
import "./styles.css";
import { Form } from "react-bootstrap";
import { Button } from "react-bootstrap";

export default function FirstPage() {
  return (
    <div className="home d-flex flex-column align-items-center">
      <h1 className="header fw-bold text-light">Local Explorer</h1>
      <p className="text-light fst-italic fs-semibold">
        Explore local events, venues, and concerts near you!
      </p>
      <Form className="homeForm ">
        <h4 className="start text-light fw-bold text-center">
          Where are you Located?
        </h4>
        <br></br>
        <div className="d-flex justify-content-center gap-3 ">
          <Form.Control
            style={{ width: "50%" }}
            placeholder="Enter city/state"
          />

          <Button>Search</Button>
        </div>
      </Form>
    </div>
  );
}
