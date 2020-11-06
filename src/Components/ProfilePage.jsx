import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { Link, Router } from "@reach/router";
import { Nav, Navbar } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Info from "./Home/Info";
import Contacto from "./Home/Contacto";
import Help from "./Home/Help";
import User from "./Home/User";

const ProfilePage = () => {
  // Asigna un user para leer el contexto del tema actual.
  // React encontrará el Provider superior más cercano y usará su valor.
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;
  console.log(" Usuario ProfilePage : " + displayName + " - " + email);

  const signOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand style={{fontSize:"1.5em"}}>GameShop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav variant="pills" className="mr-auto" defaultActiveKey="/">
         <Nav.Link><Link to="/" style={{color:"white", textDecoration:"none"}}>Sucursales</Link></Nav.Link>
            <Nav.Link><Link to="contacto" style={{color:"white", textDecoration:"none"}}>Buenas Sucursales</Link></Nav.Link>
            <Nav.Link><Link to="help" style={{color:"white", textDecoration:"none"}}>Excelentes Sucursales</Link></Nav.Link>
            <Nav.Link><Link to="user" style={{color:"white", textDecoration:"none"}}>Informe Global</Link></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link style={{marginTop:"10px", marginRight:"5px", color:"white", textDecoration:"none"}}>
              {displayName} | {email}
            </Nav.Link>
            <Nav.Link style={{
                background: `url(${
                  photoURL ||
                  "https://res.cloudinary.com/dqcsk8rsc/image/upload/v1577268053/avatar-1-bitmoji_upgwhc.png"
                })  no-repeat center center`,
                backgroundSize: "cover",
                height: "50px",
                width: "50px",
                marginTop: "2px",
                marginLeft: "5px",
                marginRight: "5px",
              }}>
            </Nav.Link>
            <Nav.Link to="">
              <Button
                variant="danger"
                onClick={() => {
                  signOut();
                }}
              >
                Cerrar Sesión
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Router>
        <Info exact path="/" />
        <Contacto exact path="contacto" />
        <Help exact path="help" />
        <User exact path="user" />
      </Router>
    </div>
  );
};

export default ProfilePage;
