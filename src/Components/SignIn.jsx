import React, { useState } from "react";
import { Link } from "@reach/router";
import { signInWithGoogle } from "../firebase";
import { auth } from "../firebase";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Col, Row, Card, Form, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const signInWithEmailAndPasswordHandler = (event) => {
    event.preventDefault(); //DOM -> POST , GET -> PHP , JAVA , ASP , ETC
    const user = auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        setError("Error, por favor revisar credenciales -> " + error);
        setShow(true);
      });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ fontSize: "1.5em" }}>GameShop</Navbar.Brand>
      </Navbar>
      <div style={{ position: "absolute", top: "40", right: "0" }}>
        <Toast onClose={() => setShow(false)} show={show} delay={6000} autohide className="fotSize">
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
                <h1 className="title">Iniciar Sesión</h1>
                <br />
                <Form>
                  <Form.Row>
                    <Form.Control
                      type="email"
                      className="fotSize"
                      placeholder="Correo Electrónico"
                      name="userEmail"
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
                      signInWithEmailAndPasswordHandler(event);
                    }}
                  >
                    Ingresar
                  </Button>{" "}
                </Form>
                <p className="text-center my-3">
                  {" "}
                  <Link
                    to="signUp"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    ¿No tiene cuenta?
                  </Link>{" "}
                  <br />{" "}
                  <Link
                    to="passwordReset"
                    className="text-blue-500 hover:text-blue-600"
                  >
                    ¿Olvido su contraseña?
                  </Link>
                </p>
                <Button
                  className="fotSize"
                  variant="outline-info"
                  block
                  onClick={() => {
                    signInWithGoogle();
                  }}
                >
                  Ingresar con Google
                </Button>{" "}
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

export default SignIn;
