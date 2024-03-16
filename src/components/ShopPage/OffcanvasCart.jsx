import React from "react";
import { Offcanvas } from "react-bootstrap";

const OffcanvasCart = ({ show, onHide }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" scroll="true">
      <Offcanvas.Header closeButton className="myfont">
        <Offcanvas.Title>Il mio carrello</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <p>Non c'è ancora nessun articolo nel carrello</p>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasCart;
