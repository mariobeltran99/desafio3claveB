import React, { useState, useEffect } from "react";
import { firestore } from "../firebase";
import { Card, Form, InputGroup, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";

const AlumnosForm = (props) => {
  const initialStateValues = {
    nombre: "",
    ganancia: 1000,
    empleado: 10,
  };

  const [values, setValues] = useState(initialStateValues);
  const [Sucursal, setSucursal] = useState([]);
  const [show, setShow] = useState(false);
  const [warnings, setWarnings] = useState(null);

  const getSucursal = async () => {
    firestore
      .collection("Sucursal")
      .where("empleado", "<", "20")
      .onSnapshot((querySnapshot) => {
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
    const reg = new RegExp("^\\s");
    if (
      values.nombre === null ||
      reg.test(values.nombre) === true ||
      values.nombre.trim() === ""
    ) {
      setWarnings("Campo nombre vacío");
      setShow(true);
      setTimeout(() => {
        setWarnings(null);
      }, 6000);
    } else if (values.ganancia < 1000 || values.ganancia > 50000) {
      setWarnings("Tiene que ser entre $1000.00 a $50,000.00");
      setShow(true);
      setTimeout(() => {
        setWarnings(null);
      }, 6000);
    } else if (values.empleado < 10 || values.empleado > 40) {
      setWarnings("Tiene que ser entre 10 a 40 empleados");
      setShow(true);
      setTimeout(() => {
        setWarnings(null);
      }, 6000);
    } else {
      if (values.empleado > 20) {
        if (Sucursal.length === 0) {
          setWarnings(
            "Todas las sucursales están llenas de empleados para transferir"
          );
          setShow(true);
          setTimeout(() => {
            setWarnings(null);
          }, 6000);
        } else {
          let restantes = values.empleado - 20;
          values.empleado = 20;
          console.log(restantes, values.empleado);
          console.log(Sucursal);
        }
      } else if (values.empleado <= 20) {
        values.empleado = parseInt(values.empleado);
        values.ganancia = parseFloat(values.ganancia);
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
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1" className="fotSize">
                  Nombre de Sucursal
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="text"
                className="fotSize"
                placeholder="GameStack"
                name="nombre"
                autoComplete="off"
                onChange={handleInputChange}
                value={values.nombre}
              />
            </InputGroup>
          </Form.Row>
          <br />
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1" className="fotSize">
                  Gananacias ($)
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                className="fotSize"
                min="1000.00"
                max="50000.00"
                step="1.00"
                placeholder="Ganancia"
                name="ganancia"
                autoComplete="off"
                onChange={handleInputChange}
                value={parseFloat(values.ganancia)}
              />
            </InputGroup>
          </Form.Row>
          <br />
          <Form.Row>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1" className="fotSize">
                  Cantidad de Empleados
                </InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control
                type="number"
                className="fotSize"
                min="10"
                max="40"
                placeholder="Empleados"
                name="empleado"
                autoComplete="off"
                onChange={handleInputChange}
                value={parseInt(values.empleado)}
              />
            </InputGroup>
          </Form.Row>
          <br />
          <Button
            variant="outline-primary"
            className="fotSize"
            block
            onClick={(event) => {
              handleSubmit(event);
            }}
          >
            {props.currentId === "" ? "Guardar" : "Actualizar"}
          </Button>{" "}
        </Form>
        <br />
        <Toast
          onClose={() => setShow(false)}
          show={show}
          delay={6000}
          autohide
          className="fotSize warnings"
        >
          <Toast.Header>
            <strong className="mr-auto">Advertencia</strong>
          </Toast.Header>
          <Toast.Body>{warnings}</Toast.Body>
        </Toast>
      </Card.Body>
    </Card>
  );
};

export default AlumnosForm;
