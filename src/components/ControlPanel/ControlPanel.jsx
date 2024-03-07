import React, { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getCustomers } from "../../redux/actions";
import { getProducts } from "../../redux/actions";
import { getServices } from "../../redux/actions";
import {
  ProductContent,
  ServiceContent,
  UserContent,
} from "../ContactsPage/AdminPanelContent";

const ControlPanel = () => {
  const [activeTab, setActiveTab] = useState(1);
  const dispatch = useDispatch();

  const handleButtonClick = (tabNumber) => {
    setActiveTab(activeTab === tabNumber ? null : tabNumber);
    switch (tabNumber) {
      case 1:
        dispatch(getCustomers());
        break;
      case 2:
        dispatch(getServices());
        break;
      case 3:
        dispatch(getProducts());
        break;
      default:
        break;
    }
  };

  return (
    <div className="my-5">
      <Row>
        <Col>
          <h2 className="text-center mb-5">Pannello Amministratore</h2>
          <div className="d-flex justify-content-center mx-auto w-50">
            <Button
              variant="primary"
              className="mx-3"
              onClick={() => handleButtonClick(1)}
              active={activeTab === 1}
            >
              Utenti
            </Button>
            <Button
              variant="primary"
              className="mx-3"
              onClick={() => handleButtonClick(2)}
              active={activeTab === 2}
            >
              Servizi
            </Button>
            <Button
              variant="primary"
              className="mx-3"
              onClick={() => handleButtonClick(3)}
              active={activeTab === 3}
            >
              Prodotti
            </Button>
          </div>
        </Col>
      </Row>
      {activeTab === 1 && <UserContent />}
      {activeTab === 2 && <ServiceContent />}
      {activeTab === 3 && <ProductContent />}
    </div>
  );
};

export default ControlPanel;
