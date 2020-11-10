import React, { useState } from "react";
import { Link } from "@reach/router";
import { auth, generateUserDocument } from "../firebase";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Col, Row, Card, Form, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const createUserWithEmailAndPasswordHandler = async (event) => {
    event.preventDefault(); // POST , GET , PHP, JAVA , ASP, ETC

    setError("");
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error , Por favor intentar de nuevo : " + error);
      setShow(true);
    }
    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };

  return (
    <div className="">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ fontSize: "1.5em" }}>GameShop</Navbar.Brand>
      </Navbar>
      <div style={{ position: "absolute", top: "40", right: "0" }}>
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={6000}
          autohide
          className="fotSize"
        >
          <Toast.Header>
            <strong className="mr-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>{error}</Toast.Body>
        </Toast>
      </div>
      <Container className="space">
        <Row className="justify-content-center">
          <Col sm={12} xl={6} md={6} lg={6} xs={12}>
            <Card>
              <Card.Body>
                <h1 className="title">Registrarse</h1>
                <br />
                <Form>
                  <Form.Row>
                    <Form.Control
                      type="text"
                      className="fotSize"
                      placeholder="Nombre"
                      name="displayName"
                      value={displayName}
                      autoComplete="off"
                      onChange={(event) => onChangeHandler(event)}
                    />
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Control
                      type="email"
                      className="fotSize"
                      placeholder="Correo Electrónico"
                      name="userEmail"
                      value={email}
                      autoComplete="off"
                      onChange={(event) => onChangeHandler(event)}
                    />
                  </Form.Row>
                  <br />
                  <Form.Row>
                    <Form.Control
                      type="password"
                      className="fotSize"
                      placeholder="Contraseña"
                      name="userPassword"
                      value={password}
                      autoComplete="off"
                      onChange={(event) => onChangeHandler(event)}
                    />
                  </Form.Row>
                  <br />
                  <Button
                    className="fotSize"
                    variant="outline-primary"
                    block
                    onClick={(event) => {
                      createUserWithEmailAndPasswordHandler(event);
                    }}
                  >
                    Registrar
                  </Button>{" "}
                </Form>
                <br/>
                <Link to="/">
                  <Button className="fotSize" variant="outline-info" block>
                    Regresar
                  </Button>{" "}
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        <br />
        <br />
      </Container>
    </div>
  );
};

export default SignUp;
