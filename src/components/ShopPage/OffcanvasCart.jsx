import React from "react";
import { Offcanvas } from "react-bootstrap";

const OffcanvasCart = ({ show, onHide }) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" scroll="true">
      <Offcanvas.Header closeButton className="myfont">
        <Offcanvas.Title>Il mio carrello</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as a placeholder. In real life, you can have the elements you
        have chosen, like text, images, lists, etc.
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default OffcanvasCart;
