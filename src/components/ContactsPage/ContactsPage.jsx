import { Col, Container, Row } from "react-bootstrap";
import IgLogo from "../../assets/IG.png";
import WaLogo from "../../assets/WhatsApp_icon.png";
import PhoneLogo from "../../assets/—Pngtree—phone icon in solid circle_5552270.png";
import MailLogo from "../../assets/Mail Icon - 480x480.png";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const ContactsPage = () => {
  const googleMapsApiKey = process.env.REACT_APP_MY_APIKEY;

  const mapStyles = {
    height: "400px",
    width: "100%",
  };

  const defaultCenter = {
    lat: 44.30757,
    lng: 8.48418,
  };
  return (
    <Container className="myfont">
      <Row>
        <Col className="col-12 align-items-center justify-content-center">
          <p className="fs-2 text-center pt-3">Contatta Le Barbier de Rue</p>
        </Col>
        <Col className="text-center">
          <img src={IgLogo} alt="IG logo" />
          <p className="fs-4">
            Instagram:<br></br> @lebarbierderue
          </p>
        </Col>
        <Col className="text-center">
          <img src={WaLogo} alt="WA logo" />
          <p className="fs-4">
            Whatsapp:<br></br> +39 342 801 5802
          </p>
        </Col>
        <Col className="text-center">
          <img src={PhoneLogo} alt="Phone logo" />
          <p className="fs-4">
            Telefono:<br></br> 019 221 7289
          </p>
        </Col>
        <Col className="text-center">
          <img src={MailLogo} alt="Mail logo" />
          <p className="fs-4">
            Email:<br></br> lebarbierderue@gmail.com
          </p>
        </Col>
        <Col className="col-12 flex flex-col justify-content-center align-items-center">
          <p className="fs-2 text-center pt-4">Vieni a trovarci</p>
          <p className="fs-4">Siamo a Savona in Via degli Orefici 36R</p>

          <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap
              mapContainerStyle={mapStyles}
              zoom={16}
              center={defaultCenter}
            >
              <Marker position={defaultCenter} />
            </GoogleMap>
          </LoadScript>
        </Col>
      </Row>
    </Container>
  );
};
export default ContactsPage;
