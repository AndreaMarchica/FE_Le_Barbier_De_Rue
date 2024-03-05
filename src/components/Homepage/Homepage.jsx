import { Col, Row } from "react-bootstrap";
import MyCarousel from "./MyCarousel";
import Locale from "../../assets/herolocale.mp4";
import Reviews from "./Rewievs";
import { useEffect, useState } from "react";
import { InstagramEmbed } from "react-social-media-embed";

const Homepage = () => {
  const [videoOpacity, setVideoOpacity] = useState(0);

  useEffect(() => {
    // Aggiorna gradualmente la trasparenza quando il componente viene montato
    const fadeInInterval = setInterval(() => {
      setVideoOpacity((prevOpacity) => {
        const newOpacity = prevOpacity + 0.05;
        if (newOpacity >= 1) {
          clearInterval(fadeInInterval);
          return 1;
        }
        return newOpacity;
      });
    }, 50);

    return () => clearInterval(fadeInInterval);
  }, []);
  return (
    <>
      {" "}
      <div className="hero-video" style={{ opacity: videoOpacity }}>
        <video
          src={Locale}
          alt="salone"
          autoPlay="true"
          // loop="true"
          muted={true}
          className="mx-auto video-width"
        />{" "}
      </div>
      <div className="container container-fluid ">
        <Row className="col-12 mx-auto">
          <Col className="col-12 text-center py-5 fs-3 myfont">
            <p className="mb-0 bebas-neue-regular fs-1 ">
              --- PRENOTA LA TUA POLTRONA AL NUMERO <b>019 221 7289</b> ---
            </p>
            <p className="fs-5">oppure accedi e prenotati online</p>
          </Col>
          <Col className="orario-container myfont pb-5">
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
            <h3 className="text-center py-3">
              Scopri i nostri look su Instagram
            </h3>
            <div className="d-flex justify-center">
              <InstagramEmbed
                url="https://www.instagram.com/lebarbierderue"
                width={800}
              />
            </div>
          </Col>
          <Col className="col-12 myfont">
            <h3 className="py-3 text-center pt-5">La storia</h3>
            <p>
              Nel cuore di Savona, tra le strade che raccontano storie e
              tradizioni, sorge LE BARBIER DE RUE, il rifugio della bellezza
              maschile fondato e guidato con maestria da Samuele D'Agnano, un
              talentuoso barbiere nato il 2 marzo 1994.
            </p>
            <p>
              {" "}
              La sua avventura nel mondo della barba e della rasatura ha inizio
              a soli 20 anni, quando decide di intraprendere la strada della
              perfezione estetica presso l'affermata Accademia UNASAS di Milano.
              Per tre intensi anni, Samuele si dedica con passione allo studio e
              all'apprendimento delle tecniche più raffinate, plasmando il suo
              talento con dedizione e precisione.
            </p>
            <p>
              {" "}
              Durante il percorso formativo, affianca il banco di scuola
              all'effervescente atmosfera di Le Garçons de Rue, un prestigioso
              salone nella vivace metropoli milanese. Qui, la sua abilità e la
              sua curiosità vengono messe alla prova, contribuendo a forgiare il
              professionista di grande spessore che oggi accoglie la clientela
              nel suo tempio della cura maschile.
            </p>
            <p>
              {" "}
              Il richiamo della sua terra natia lo guida a tornare a Savona,
              portando con sé l'eleganza e l'innovazione che ha assorbito nella
              frenetica Milano. In un salone savonese, Samuele mette a frutto la
              sua esperienza per tre anni, conquistando il rispetto della
              clientela locale e sperimentando nuove sfide ogni giorno.
            </p>
            <p>
              {" "}
              Non accontentandosi mai di stagnare, il nostro barbiere
              intraprende ulteriori corsi con rinomati maestri del settore. Da
              Menspire Londra a Andrea Magri, da Salvo Corigliano a Andrea
              Gargiulo, da Spaghettis ad Alessio Buccheri: ogni lezione è un
              tassello prezioso che arricchisce il suo bagaglio di competenze.{" "}
            </p>
            <p>
              Il 9 marzo 2021, il sogno di Samuele prende finalmente forma,
              dando vita a LE BARBIER DE RUE. In questo tempio della bellezza
              maschile, l'innovazione si fonde con la tradizione, e ogni
              dettaglio è curato con la massima attenzione. Il risultato è
              un'esperienza unica, dove il cliente diventa protagonista di un
              viaggio di stile e di benessere.
            </p>
            <p>
              {" "}
              Samuele D'Agnano, con gioia e onore, vi apre le porte del suo
              salone in via Orefici 36 R, Savona. Lasciatevi coccolare dalle sue
              abili mani e scoprite l'eccellenza di LE BARBIER DE RUE, un'oasi
              di eleganza e raffinatezza nel cuore della vostra città.
            </p>
          </Col>
          <Col>
            <h3 className="py-3 text-center pt-5">Dicono di noi</h3>
            <Reviews></Reviews>
          </Col>
        </Row>
      </div>
    </>
  );
};
export default Homepage;
