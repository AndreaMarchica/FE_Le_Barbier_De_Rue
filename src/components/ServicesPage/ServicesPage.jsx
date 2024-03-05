import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getServices } from "../../redux/actions";
import { Col, Container, Row } from "react-bootstrap";
import Video from "../../assets/Video-by-lebarbierderue.mp4";
const ServicesPage = () => {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.serviceReducer.services);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  // Ordine personalizzato delle categorie
  const categoryOrder = ["capelli", "barba", "combo"];

  // Creare un oggetto per organizzare i servizi per categoria
  const categorizedServices = services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {});

  // Organizzare le categorie nell'ordine desiderato
  const orderedCategories = categoryOrder.filter(
    (category) => categorizedServices[category]
  );

  const renderServices = (category) => {
    return (
      <div key={category}>
        {categorizedServices[category] &&
          categorizedServices[category].map((service) => (
            <div key={service.id}>
              {" "}
              <div className="d-flex justify-between">
                <h6 className="text-uppercase mb-0">{service.name}</h6>{" "}
                <p className="mb-0">{service.price}€</p>
              </div>
              <p>{service.description}</p>
            </div>
          ))}
      </div>
    );
  };

  return (
    <Container fluid className="my-font d-flex p-0">
      <div className="video-column">
        <video
          id="myVideo"
          src={Video}
          autoPlay
          muted
          loop
          className="vh-100"
        ></video>
      </div>
      <div className="list-column p-5 me-5">
        <h3 className="text-center  bebas-neue-regular fs-1">
          I nostri servizi
        </h3>
        <Row className="pt-5">
          <Col>
            <h3 className="bebas-neue-regular">Capelli</h3>
            <hr />
            {renderServices("capelli")}
          </Col>
        </Row>
        <Row className="pt-5">
          <Col>
            <h3 className="bebas-neue-regular">Barba</h3>
            <hr />
            {renderServices("barba")}
          </Col>
        </Row>
        <Row className="pt-5">
          <Col>
            <h3 className="bebas-neue-regular">Combo</h3>
            <hr />
            {renderServices("combo")}
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default ServicesPage;
