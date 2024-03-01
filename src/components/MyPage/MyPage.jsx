import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReservations, getServices } from "../../redux/actions/index";
import { format } from "date-fns";
import { it as italianLocale } from "date-fns/locale";
import Calendar from "../../assets/icons8-calendario-60.png";
import Sedia from "../../assets/icons8-sedia-da-barbiere-50.png";

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

  return (
    <Container className="myfont">
      <Row>
        <Col className="col-3">
          <div className="d-flex flex-col pt-5">
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
          <div className="mx-auto text-center pt-2">
            <p>
              {meDataFromReduxStore.name + " " + meDataFromReduxStore.surname}
            </p>
            <p>{meDataFromReduxStore.email}</p>
            <p>{meDataFromReduxStore.phoneNumber}</p>
          </div>{" "}
        </Col>

        <Col className="col-9">
          <div className="d-flex flex-col pt-5">
            <p>
              <b>LE MIE PRENOTAZIONI</b>
            </p>
            {filteredReservations.map((reservation) => (
              <div
                key={reservation.id}
                className="d-flex flex-row align-items-center"
              >
                <img
                  src={Calendar}
                  alt="calendario"
                  className="calendar-icon"
                />
                <p className="m-0 ms-3">
                  {format(
                    new Date(reservation.reservationDate),
                    "EEEE dd/MM/yyyy 'alle ore' HH:mm",
                    { locale: italianLocale }
                  )}
                </p>{" "}
                <img
                  src={Sedia}
                  alt="calendario"
                  className="calendar-icon ms-5"
                />
                <p className="m-0 ms-3">
                  {getServiceName(
                    reservation.haircutId ||
                      reservation.comboId ||
                      reservation.beardcutId,
                    services
                  )}
                </p>
                {/* Altre informazioni sulla prenotazione */}
              </div>
            ))}
          </div>
        </Col>
        <Col className="col-12">
          <p>
            <b>I MIEI PUNTI</b>
          </p>
        </Col>
      </Row>
    </Container>
  );
};
export default MyPage;
