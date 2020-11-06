import React, { useEffect, useState } from "react";
import AlumnosForm from "./AlumnosForm";
import { firestore } from "../firebase";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const Alumnos = () => {
  const [Sucursal, setSucursal] = useState([]);
  const [currentId, setCurrentId] = useState("");

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
    if (window.confirm("¿Desea eliminar esta sucursal?")) {
      await firestore.collection("Sucursal").doc(id).delete();
      toast("Se elimino una Sucursal", {
        type: "error",
        //autoClose: 2000
      });
    }
  };

  useEffect(() => {
    getSucursal();
  }, []);

  const addOrEditSucursal = async (SucursalObj) => {
    try {
      if (currentId === "") {
        await firestore.collection("Sucursal").doc().set(SucursalObj);
        toast("Se agrego una Sucursal", {
          type: "success",
        });
      } else {
        await firestore.collection("Sucursal").doc(currentId).update(SucursalObj);
        toast("Se actualizo una Sucursal ", {
          type: "info",
        });
        setCurrentId("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>    
      <Container className="space">
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
                  <td>$ {Employ.ganancia}</td>
                  <td>{Employ.empleado}</td>
                  <td>
                    <Button
                      variant="outline-warning"
                      block
                      onClick={() => setCurrentId(Employ.id)}
                    >
                      Editar
                    </Button>{" "}
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
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

