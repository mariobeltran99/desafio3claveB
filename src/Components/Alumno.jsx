import React, { useEffect, useState } from "react";
import AlumnosForm from "./AlumnosForm";
import { firestore } from "../firebase";
import Container from "react-bootstrap/Container";
import { Col, Row, Toast } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Alumnos = () => {
  const [Sucursal, setSucursal] = useState([]);
  const [currentId, setCurrentId] = useState("");
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState(null);

  const getSucursal = async () => {
    firestore.collection("Sucursal").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setSucursal(docs);
    });
  };

  const onDeleteSucursal = async (id) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("¿Desea eliminar esta sucursal definitivamente")) {
      await firestore.collection("Sucursal").doc(id).delete();
      setShow(true);
      setMessage("Sucursal Eliminada");
    }
  };

  useEffect(() => {
    getSucursal();
  }, []);

  const addOrEditSucursal = async (SucursalObj) => {
    try {
      if (currentId === "") {
        await firestore.collection("Sucursal").doc().set(SucursalObj);
        setShow(true);
        setMessage("Sucursal Registrada");
      } else {
        await firestore
          .collection("Sucursal")
          .doc(currentId)
          .update(SucursalObj);
        setShow(true);
        setMessage("Sucursal Modificada");
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Container className="space">
        <div style={{ position: "absolute", top: "40", right: "0" }}>
          <Toast
            onClose={() => setShow(false)}
            show={show}
            delay={6000}
            autohide
            className="fotSize success"
          >
            <Toast.Header>
              <strong className="mr-auto">Exitoso</strong>
            </Toast.Header>
            <Toast.Body>{message}</Toast.Body>
          </Toast>
        </div>
        <Row className="justify-content-center">
          <Col sm={12} xl={6} md={6} lg={6} xs={12}>
            <AlumnosForm {...{ addOrEditSucursal, currentId, Sucursal }} />
          </Col>
        </Row>
        <br />
        <br />
        <Row className="justify-content-center">
          <Col sm={12} xl={12} md={12} lg={12} xs={12}>
            <h1 className="title">Lista de Sucursales</h1>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre de Sucursal</th>
                  <th>Ganancia($)</th>
                  <th>Empleados</th>
                  <th>Editar</th>
                  <th>Eliminar</th>
                </tr>
              </thead>
              <tbody>
                {Sucursal.map((Employ) => (
                  <tr key={Employ.id}>
                    <td>{Employ.nombre}</td>
                    <td>$ {parseFloat(Employ.ganancia).toFixed(2)}</td>
                    <td>{Employ.empleado}</td>
                    <td>
                      <Button
                        variant="outline-warning"
                        className="fotSize"
                        block
                        onClick={() => setCurrentId(Employ.id)}
                      >
                        Editar
                      </Button>{" "}
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        className="fotSize"
                        block
                        onClick={() => onDeleteSucursal(Employ.id)}
                      >
                        Eliminar
                      </Button>{" "}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Alumnos;
