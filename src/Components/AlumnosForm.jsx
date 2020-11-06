import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { Card, Col, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
//import { toast } from "react-toastify";

const AlumnosForm = (props) => {

  const initialStateValues = {
    nombre: "",
    ganancia: 1000,
    empleado: 10,
  };

  const [values, setValues] = useState(initialStateValues);
  const [Sucursal, setSucursal] = useState([]);

  const getSucursal = async () => {
    firestore.collection("Sucursal").where('empleado','<',"20").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setSucursal(docs);
    });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const reg = new RegExp('^\\s');
    if(values.nombre === null || reg.test(values.nombre) === true || values.nombre.trim() === "" ){
      alert("Campo nombre vacío");
    }else if (values.ganancia < 1000){
      alert("Mínimos tiene que ser $1000.00")
    }else if (values.empleado < 10 ){
      alert("Tiene que ser mínimo 10 empleados");
    }else{
      if(values.empleado > 20){
        if(Sucursal.length === 0){
          alert("Todas las sucursales están llenas de empleados para transferir");
        }else{
          let restantes = values.empleado - 20;
          values.empleado = 20;
          console.log(restantes, values.empleado);
          console.log(Sucursal);

        }
      }else if( values.empleado <= 20){
        props.addOrEditSucursal(values);
        setValues({ ...initialStateValues });
      }
      //props.addOrEditSucursal(values);
      //setValues({ ...initialStateValues });
    }
  };

  const getAlumnoById = async (id) => {
    const doc = await firestore.collection("Sucursal").doc(id).get();
    setValues({ ...doc.data() });
  };

  useEffect(() => {
    getSucursal();
    if (props.currentId === "") {
      setValues({ ...initialStateValues });
    } else {
      //https://stackoverflow.com/questions/56059127/how-to-fix-this-error-function-collectionreference-doc
      if (props.currentId !== null && props.currentId !== undefined) {
        getAlumnoById(props.currentId);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.currentId]);

  return (
    <Card>
      <Card.Body>
        <h1 className="title">Formulario de Sucursal</h1>
        <br />
        <Form>
          <Form.Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="Nombre de Sucursal"
                name="nombre"
                autoComplete="off"
                onChange={handleInputChange}
                value={values.nombre}
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                min="1000.00"
                placeholder="Ganancia"
                name="ganancia"
                autoComplete="off"
                onChange={handleInputChange}
                value={values.ganancia}
              />
            </Col>
          </Form.Row>
          <br />
          <Form.Row>
            <Col>
              <Form.Control
                type="number"
                min="10"
                max="20"
                placeholder="Empleados"
                name="empleado"
                autoComplete="off"
                onChange={handleInputChange}
                value={values.empleado}
              />
            </Col>
          </Form.Row>
          <br />
          <Button
            variant="outline-primary"
            block
            onClick={(event) => {
              handleSubmit(event);
            }}
          >
            {props.currentId === "" ? "Guardar" : "Actualizar"}
          </Button>{" "}
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AlumnosForm;
