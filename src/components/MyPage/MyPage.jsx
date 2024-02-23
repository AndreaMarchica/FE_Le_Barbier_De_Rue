import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getReservations } from "../../redux/actions/index";

const MyPage = () => {
  const meDataFromReduxStore = useSelector((state) => state.me.userData);
  const reservations = useSelector((state) => state.reservations.reservations);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getReservations());
  }, [dispatch]);

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
  console.log("My reservations", userReservations);

  return (
    <Container>
      <Row>
        <Col className="col-3">
          <div className="d-flex flex-col pt-5">
            <div className="d-flex justify-content-between">
              <p>PROFILO</p>
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
            <p>LE MIE PRENOTAZIONI</p>
            {userReservations.map((reservation) => (
              <div key={reservation.id}>
                <p>Data: {reservation.reservationDate}</p>
                {/* Altre informazioni sulla prenotazione */}
              </div>
            ))}
          </div>
        </Col>
        <Col className="col-12">
          <p>I MIEI PUNTI</p>
        </Col>
      </Row>
    </Container>
  );
};
export default MyPage;
