import React, { useState } from "react";
import { auth } from "../firebase";
import { Link } from "@reach/router";
import { Navbar } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import { Col, Row, Card, Form, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const PasswordReset = () => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    }
  };

  const sendResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailHasBeenSent(true);
      })
      .catch(() => {
        setError("Error al recuperar la contraseña");
        setShow(true);
      });
  };
  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{ fontSize: "1.5em" }}>GameShop</Navbar.Brand>
      </Navbar>
      <div style={{ position: "absolute", top: "40", right: "0" }}>
        <Toast onClose={() => setEmailHasBeenSent(false)} show={emailHasBeenSent} delay={6000} autohide className="fotSize">
          <Toast.Header>
            <strong className="mr-auto">Correo Enviado</strong>
          </Toast.Header>
          <Toast.Body>Revise su buzón de entrada</Toast.Body>
        </Toast>
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
                <h1 className="title">Recuperar Contraseña</h1>
                <br />
                <Form>
                  <Form.Row>
                    <Form.Control
                      type="email"
                      className="fotSize"
                      placeholder="Correo Electrónico"
                      name="userEmail"
                      id="userEmail"
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
                      sendResetEmail(event);
                    }}
                  >
                    Enviar Correo Electrónico
                  </Button>{" "}
                </Form>
                <br />
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

export default PasswordReset;
