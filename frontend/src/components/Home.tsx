import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import { myContext } from "./User/UserContext";

export default function Home() {
  const ctx = useContext(myContext);
  console.log(ctx);
  return <Container>Home</Container>;
}
