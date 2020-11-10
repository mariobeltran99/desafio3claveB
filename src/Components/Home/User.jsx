import React, { useEffect, useState } from "react";
import { firestore } from "../../firebase";
import Container from "react-bootstrap/Container";
import { Col, Row, Card } from "react-bootstrap";
const User = () => {
  const [Sucursal, setSucursal] = useState([]);
  const getSucursal = async () => {
    firestore.collection("Sucursal").onSnapshot((querySnapshot) => {
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
  const cantidadSucursal1 = Sucursal.filter(sucur => sucur.ganancia < 30000);
  const cantidadSucursal2 = Sucursal.filter(sucur => sucur.ganancia >= 30000);
  const ventTot = Sucursal.reduce(function(prev, next){ return parseFloat(parseFloat(prev) + parseFloat(next.ganancia)).toFixed(2);},0);
  return (
    <React.Fragment>
      <Container className="space">
        <br />
        <br />
        <Row className="justify-content-center space">
          <Col sm={12} xl={12} md={12} lg={12} xs={12}>
              <h1>Sucursales que obtienen ganancias entre $1,000.00 y $30,000.00 son : {cantidadSucursal1.length}</h1> 
              <br/>
              {cantidadSucursal1.map((sucur) => (
                <Card className="space">
                  <Card.Body key={sucur.id}>
                    <p><strong>Nombre de Sucursal:</strong> {sucur.nombre} - (Buen Trabajo)</p>
                    <p><strong>Ganancia: </strong> $ {parseFloat(sucur.ganancia).toFixed(2)}</p>
                    <p><strong>Cantidad de Empleados: </strong> {sucur.empleado}</p>
                  </Card.Body>
                </Card> 
              ))}
          </Col>
        </Row>
        <Row className="justify-content-center space">
          <Col sm={12} xl={12} md={12} lg={12} xs={12}>
              <h1>Sucursales que obtienen ganancias mayores de $30,000.00 son : {cantidadSucursal2.length}</h1> 
              <br/>
              {cantidadSucursal2.map((sucur) => (
                <Card className="space">
                  <Card.Body key={sucur.id}>
                    <p><strong>Nombre de Sucursal:</strong> {sucur.nombre} - (Excelente Trabajo)</p>
                    <p><strong>Ganancia: </strong> $ {parseFloat(sucur.ganancia).toFixed(2)}</p>
                    <p><strong>Cantidad de Empleados: </strong> {sucur.empleado}</p>
                  </Card.Body>
                </Card> 
              ))}
          </Col>
        </Row>
        <Row className="justify-content-center space">
          <Col sm={12} xl={12} md={12} lg={12} xs={12}>
              <h1>Ganancia Total de la Empresa: $ {ventTot}</h1>  
          </Col>
        </Row>
        <br/>
      </Container>
    </React.Fragment>
  );
}

export default User