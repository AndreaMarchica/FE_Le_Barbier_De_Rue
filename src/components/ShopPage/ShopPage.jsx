import ShopHero from "../../assets/poit-hair-prodotti-per-la-barba.jpg";
import ShopHero2 from "../../assets/barba-folta-1170x780.jpg.webp";
import { Col, Container, Row } from "react-bootstrap";
import ItemCard from "./ItemCard";
import { useEffect, useState } from "react";
import { addToCart, getProducts } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import OffcanvasCart from "./OffcanvasCart";
import Pettine from "../../assets/pettine-3.png";

const ShopPage = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);

  const hairCareProducts = products.filter(
    (product) => product.category === "capelli"
  );
  const beardCareProducts = products.filter(
    (product) => product.category === "barba"
  );
  const otherProducts = products.filter(
    (product) => product.category === "altro"
  );
  const [showOffcanvas, setShowOffcanvas] = useState(false);
  const handleCartClick = () => {
    // Logica da eseguire al click del carrello
    console.log("ShopPage logic on cart click");
    setShowOffcanvas(true); // Mostra l'offcanvas al click del carrello
  };
  const handleOffcanvasHide = () => {
    // Logica da eseguire quando l'offcanvas viene nascosto
    console.log("Offcanvas hidden");
    setShowOffcanvas(false);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <>
      <div className="myshopbg pb-5">
        <div
          className="d-flex bebas-neue-regular text-center drop-shadow-xl"
          style={{ height: "50vh" }}
        >
          <div className="position-relative w-50">
            <p className="position-absolute top-0 end-0 m-3 text-white fs-1 w-25">
              IL TUO STILE OGNI GIORNO
            </p>
            <img
              src={ShopHero2}
              alt="man"
              className="w-100 h-100 object-fit-cover"
            />
          </div>
          <div className="position-relative w-50">
            <p className="position-absolute top-0 end-0 m-3 text-white fs-1 w-25">
              PENSATI PER OGNI TUA ESIGENZA
            </p>
            <img
              src={ShopHero}
              alt="line"
              className="w-100 h-100 object-fit-cover"
            />
          </div>
        </div>{" "}
        <div className="d-flex justify-content-end pt-3 me-5 mycart">
          <Cart onCartClick={handleCartClick}></Cart>
        </div>
        <Container className="px-5 pb-5 rounded">
          <Row className="align-items-center ">
            <Col className="text-center bebas-neue-regular">
              <div className="d-flex flex-column justify-center align-items-center">
                <h1 className="pt-5">L'ARTE DELLA CURA MASCHILE</h1>
                <p className="fs-4">
                  Dall'Esperienza del Barbiere alla Tua Casa: Scopri la Nostra
                  Gamma Creata per Te
                </p>
                <div>
                  <img src={Pettine} alt="pettine" className="pettine" />{" "}
                </div>
              </div>
            </Col>
          </Row>
          <OffcanvasCart show={showOffcanvas} onHide={handleOffcanvasHide} />
          <Row>
            <Col className="col-12">
              <h3 className="bebas-neue-regular pt-5 pb-3">Capelli</h3>
            </Col>

            {hairCareProducts.map((product) => (
              <Col key={product.id} className="col-3">
                <ItemCard productId={product.id} products={product}></ItemCard>
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="col-12">
              <h3 className="bebas-neue-regular pt-5 pb-3">Barba</h3>
            </Col>

            {beardCareProducts.map((product) => (
              <Col key={product.id} className="col-3">
                <ItemCard productId={product.id} products={product}></ItemCard>
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="col-12">
              <h3 className="bebas-neue-regular pt-5 pb-3">Altro</h3>
            </Col>

            {otherProducts.map((product) => (
              <Col key={product.id} className="col-3">
                <ItemCard productId={product.id} products={product}></ItemCard>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </>
  );
};
export default ShopPage;
