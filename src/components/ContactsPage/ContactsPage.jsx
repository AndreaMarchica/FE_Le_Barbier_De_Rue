import { Col, Container, Row } from "react-bootstrap";
import IgLogo from "../../assets/IG.png";
import WaLogo from "../../assets/WhatsApp_icon.png";
import PhoneLogo from "../../assets/—Pngtree—phone icon in solid circle_5552270.png";
import MailLogo from "../../assets/Mail Icon - 480x480.png";

const ContactsPage = () => {
  return (
    <Container>
      <Row>
        <Col className="col-12 align-items-center justify-content-center">
          <p className="fs-2 text-center">Contatta Le Barbier de Rue</p>
        </Col>
        <Col className="text-center">
          <img src={IgLogo} alt="IG logo" />
          <p>Instagram: @lebarbierderue</p>
        </Col>
        <Col className="text-center">
          <img src={WaLogo} alt="WA logo" />
          <p>Whatsapp: +39 342 801 5802</p>
        </Col>
        <Col className="text-center">
          <img src={PhoneLogo} alt="Phone logo" />
          <p>Telefono: 019 221 7289</p>
        </Col>
        <Col className="text-center">
          <img src={MailLogo} alt="Mail logo" />
          <p>Email: lebarbierderue@gmail.com</p>
        </Col>
        <Col className="col-12 flex flex-col justify-content-center align-items-center">
          <p className="fs-2 text-center pt-2">Vieni a trovarci</p>
          <p>Siamo a Savona in Via degli Orefici 36R</p>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.521260322283!2d106.8195613507864!3d-6.194741395493371!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5390917b759%3A0x6b45e67356080477!2sPT%20Kulkul%20Teknologi%20Internasional!5e0!3m2!1sen!2sid!4v1601138221085!5m2!1sen!2sid"
            width="600"
            height="450"
            frameBorder="0"
            style={{ border: 0 }}
            allowFullScreen=""
            aria-hidden="false"
            tabIndex="0"
          />
        </Col>
      </Row>
    </Container>
  );
};
export default ContactsPage;
