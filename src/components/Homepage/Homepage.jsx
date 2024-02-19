import { Col, Row } from "react-bootstrap";
import Salone from "../../assets/salone.jpg";
import MyCarousel from "./MyCarousel";

const Homepage = () => {
  return (
    <div className="container">
      <Row className="col-11 mx-auto">
        <Col className="col-12 py-4 mx-auto">
          <img src={Salone} alt="salone" />
        </Col>
        <Col className="col-12 text-center fs-3 ">
          <p>PRENOTA LA TUA POLTRONA AL NUMERO 019 221 7289</p>
        </Col>
        <Col className="orario-container">
          <div className="orario-circle text-center">
            Lunedì<br></br>Chiuso
          </div>
          <div className="orario-circle text-center">
            Martedì<br></br>9-19
          </div>
          <div className="orario-circle text-center">
            Mercoledì<br></br>9-19
          </div>
          <div className="orario-circle text-center">
            Giovedì<br></br>9-19
          </div>
          <div className="orario-circle text-center">
            Venerdì<br></br>9-19
          </div>
          <div className="orario-circle text-center">
            Sabato<br></br>9-19
          </div>
          <div className="orario-circle text-center">
            Domenica<br></br>Chiuso
          </div>
        </Col>
        <Col>
          <MyCarousel></MyCarousel>
        </Col>
        <Col>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            accusantium vero repellendus praesentium autem consequatur porro,
            deleniti eveniet quas ipsum placeat iusto pariatur et cumque eos,
            excepturi fugiat necessitatibus a? Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Voluptas accusantium vero repellendus
            praesentium autem consequatur porro, deleniti eveniet quas ipsum
            placeat iusto pariatur et cumque eos, excepturi fugiat
            necessitatibus a? Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Voluptas accusantium vero repellendus praesentium autem
            consequatur porro, deleniti eveniet quas ipsum placeat iusto
            pariatur et cumque eos, excepturi fugiat necessitatibus a? Lorem
          </p>
        </Col>
      </Row>
    </div>
  );
};
export default Homepage;
