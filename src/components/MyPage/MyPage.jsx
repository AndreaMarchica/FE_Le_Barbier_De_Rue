import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReservations, getServices } from "../../redux/actions/index";
import { format } from "date-fns";
import { it as italianLocale } from "date-fns/locale";
import Calendar from "../../assets/icons8-calendario-60.png";
import Sedia from "../../assets/icons8-sedia-da-barbiere-50.png";
import Telefono from "../../assets/icons8-telefono-50.png";
import Email from "../../assets/icons8-posta-48.png";
import User from "../../assets/icons8-utente-50.png";
import { Button } from "@nextui-org/react";
import Swal from "sweetalert2";
import FidelityChart from "./FidelityChart";

const MyPage = () => {
  const meDataFromReduxStore = useSelector((state) => state.me.userData);
  const reservations = useSelector((state) => state.reservations.reservations);
  const services = useSelector((state) => state.serviceReducer.services);
  const [filteredReservations, setFilteredReservations] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations());
    dispatch(getServices());
  }, [dispatch]);

  console.log("Servizi", services);

  const getServiceName = (serviceId) => {
    const service = services && services.find((s) => s.id === serviceId);
    return service ? service.name : "Servizio non trovato";
  };

  useEffect(() => {
    const userReservations = reservations.filter((reservation) => {
      const reservationDate = new Date(reservation.reservationDate);
      const currentDate = new Date();
      const formattedCurrentDate = new Date(
        currentDate.toISOString().split("T")[0]
      );
      return (
        reservation.user.id === meDataFromReduxStore.id &&
        reservationDate >= formattedCurrentDate
      );
    });
    console.log("UserReservations", userReservations);

    setFilteredReservations(userReservations);

    console.log("Filtered reservations", filteredReservations);
  }, [reservations, meDataFromReduxStore]);

  useEffect(() => {
    console.log("Filtered reservations", filteredReservations);
  }, [filteredReservations]);
  const handleButtonClick = () => {
    Swal.fire({
      title: "Vuoi davvero eliminare questa prenotazione?",
      text: null,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sì, elimina!",
      cancelButtonText: "Annulla",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Eliminata!",
          text: "Prenotazione cancellata con successo",
          icon: "success",
        });
        // Qui potresti aggiungere la logica per effettuare l'azione di eliminazione effettiva
        // ad esempio, chiamare una funzione di eliminazione o inviare una richiesta API
      }
    });
  };

  return (
    <>
      <Container className="myfont">
        <Row>
          <Col className="col-3">
            <div className=" border border-black mt-5 rounded p-2">
              <div className="d-flex flex-col">
                <div className="d-flex justify-content-between">
                  <p>
                    <b>PROFILO</b>
                  </p>
                  <p>Modifica</p>
                </div>
                <img
                  src={meDataFromReduxStore.avatar}
                  alt="Avatar"
                  style={{ borderRadius: "50%" }}
                  className="mx-auto"
                />{" "}
              </div>
              <div className="mx-auto pt-1">
                <div className="d-flex align-items-center pt-3">
                  <img src={User} alt="utente" className="my-icon me-3" />
                  <p className="mb-0">
                    {meDataFromReduxStore.name +
                      " " +
                      meDataFromReduxStore.surname}
                  </p>
                </div>
                <div className="d-flex align-items-center pt-3">
                  <img src={Email} alt="mail" className="my-icon me-3" />
                  <p className="mb-0">{meDataFromReduxStore.email}</p>{" "}
                </div>
                <div className="d-flex align-items-center pt-3">
                  <img src={Telefono} alt="phone" className="my-icon me-3" />
                  <p className="mb-0">{meDataFromReduxStore.phoneNumber}</p>
                </div>
              </div>{" "}
            </div>
          </Col>

          <Col className="col-9">
            <div className=" border border-black rounded mt-5 p-2">
              <div className="d-flex flex-col">
                <p>
                  <b>LE MIE PRENOTAZIONI</b>
                </p>
                {filteredReservations.map((reservation, index) => (
                  <div
                    key={reservation.id}
                    className={`d-flex flex-row align-items-center rounded p-2 ${
                      index % 2 === 0 ? "even" : "odd"
                    }`}
                  >
                    <Col className="col-5 d-flex">
                      <img
                        src={Calendar}
                        alt="calendario"
                        className="my-icon"
                      />
                      <p className="m-0 ms-3">
                        {format(
                          new Date(reservation.reservationDate),
                          "EEEE dd/MM/yyyy 'alle ore' HH:mm",
                          { locale: italianLocale }
                        )}
                      </p>{" "}
                    </Col>
                    <Col className="col-5 d-flex">
                      <img
                        src={Sedia}
                        alt="calendario"
                        className="my-icon ms-5"
                      />
                      <p className="m-0 ms-3">
                        {getServiceName(
                          reservation.haircutId ||
                            reservation.comboId ||
                            reservation.beardcutId,
                          services
                        )}
                      </p>
                    </Col>
                    <div className="ms-auto">
                      <Button
                        color="danger"
                        size="sm"
                        onClick={handleButtonClick}
                      >
                        Elimina
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col className="col-12 pt-3">
            <p>
              <b>I MIEI PUNTI</b>
            </p>
          </Col>
          <Col className="col-4">
            {" "}
            <FidelityChart></FidelityChart>
          </Col>
        </Row>
      </Container>{" "}
    </>
  );
};
export default MyPage;
