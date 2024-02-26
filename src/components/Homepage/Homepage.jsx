import { Col, Row } from "react-bootstrap";
import MyCarousel from "./MyCarousel";
import Locale from "../../assets/locale.mp4";
import Reviews from "./Rewievs";

const Homepage = () => {
  return (
    <div className="container">
      <Row className="col-12 mx-auto">
        <Col className="col-12 py-4 mx-auto">
          <video
            src={Locale}
            alt="salone"
            autoPlay="true"
            loop="true"
            className="mx-auto"
          />
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
        <Col className="col-12">
          <p className="myfont">
            Ciao sono Samuele D’Agnano, nato a Savona il 2 Marzo 1994, fondatore
            e proprietario di LE BARBIER DE RUE. All’età di 20 anni decido di
            intraprendere la carriera di barbiere, frequentando per 3 anni la
            rinomata Accademia UNASAS sita in Milano. Contemporaneamente
            all’Accademia, alterno scuola e lavoro, lavorando presso LE GARCONS
            DE RUE, un salone molto conosciuto e pregiato della metropoli
            milanese. Successivamente decido di tornare in patria con l’intento
            di portare nozioni e innovazioni conosciute a Milano nella mia città
            nativa. Lavoro in un salone Savonese per 3 anni, dove cerco di farmi
            conoscere il più possibile e nel frattempo frequento corsi con
            alcuni dei più famosi Barbieri presenti nel mio settore, quali
            Menspire Londra, Andrea Magri, Salvo Corigliano, Andrea Gargiulo,
            Spaghettis e Alessio Buccheri. Dopo tanti sacrifici il 9 marzo 2021
            con grande gioia realizzo il mio sogno dando vita a LE BARBIER DE
            RUE, una Barberia innovativa e molto attenta al dettaglio. Sarò
            felice e onorato di accogliervi nel mio Salone, via orefici 36 R
            Savona.
          </p>
        </Col>
        <Col>
          <Reviews></Reviews>
        </Col>
      </Row>
    </div>
  );
};
export default Homepage;
