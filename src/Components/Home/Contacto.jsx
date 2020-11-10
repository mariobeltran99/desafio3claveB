import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
const Contacto = () => {
  const [Sucursal, setSucursal] = useState([]);
  const getSucursal = async () => {
    firestore.collection("Sucursal").where('ganancia','<',30000).onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setSucursal(docs);
    });
  };
  useEffect(() => {
    getSucursal();
  }, []);
  return (
    <React.Fragment>
      <Container className="space">
        <br />
        <br />
        <Row className="justify-content-center">
          <Col sm={12} xl={12} md={12} lg={12} xs={12}>
            <h1 className="title">Lista de Sucursales menores a $30,0000</h1>
            <br />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nombre de Sucursal</th>
                  <th>Ganancia($)</th>
                  <th>Empleados</th>
                  <th>Estado de Ganancia</th>
                </tr>
              </thead>
              <tbody>
                {Sucursal.map((Employ) => (
                  <tr key={Employ.id}>
                    <td>{Employ.nombre}</td>
                    <td>$ {parseFloat(Employ.ganancia).toFixed(2)}</td>
                    <td>{parseInt(Employ.empleado)}</td>
                    <td>Buen Trabajo</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Contacto;
