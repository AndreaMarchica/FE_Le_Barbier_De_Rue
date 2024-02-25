export const GET_ME = "GET_ME";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const GET_RESERVATIONS = "GET_RESERVATIONS";
export const POST_RESERVATION = "POST_RESERVATION";
export const DELETE_RESERVATION = "DELETE_RESERVATION";
export const GET_CUSTOMERS = "GET_CUSTOMERS";

export const getMeDataAction = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    fetch("http://localhost:3001/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel recupero dei dati dell'utente");
        }
      })
      .then((me) => {
        console.log(me);
        dispatch({
          type: GET_ME,
          payload: me,
        });
      })
      .catch((err) => {
        console.log("errore", err);
      });
  };
};
export const loginAction = () => ({
  type: LOGIN,
});

export const logoutAction = () => ({
  type: LOGOUT,
});

export const getReservations = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    fetch("http://localhost:3001/reservations", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel recupero delle prenotazioni");
        }
      })
      .then((reservations) => {
        console.log(reservations);
        dispatch({
          type: GET_RESERVATIONS,
          payload: reservations,
        });
      })
      .catch((err) => {
        console.log("errore", err);
      });
  };
};

export const createSingleReservation = (
  reservationDate,
  haircutId,
  beardcutId,
  comboId,
  userId
) => {
  console.log("Parametri di handleSingleReservation:", {
    reservationDate,
    haircutId,
    beardcutId,
    comboId,
    userId,
  });
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const res = await fetch("http://localhost:3001/reservations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          reservationDate,
          haircutId,
          beardcutId,
          comboId,
          userId,
        }),
      });

      if (res.ok) {
        const reservation = await res.json();
        console.log(reservation);
        dispatch({
          type: POST_RESERVATION,
          payload: reservation,
        });
      } else {
        throw new Error("Errore nel salvataggio della prenotazione");
      }
    } catch (err) {
      console.log("errore", err);
    }
  };
};

export const deleteSingleReservation = (reservationData) => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    try {
      const res = await fetch(
        `http://localhost:3001/reservations/${reservationData.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );

      if (res.ok) {
        dispatch({
          type: DELETE_RESERVATION,
          payload: reservationData.id,
        });
      } else {
        throw new Error("Errore durante l'eliminazione della prenotazione");
      }
    } catch (err) {
      console.error("Errore", err);
    }
  };
};
export const getCustomers = () => {
  const token = localStorage.getItem("token");
  return async (dispatch) => {
    fetch("http://localhost:3001/users", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore nel recupero degli utenti");
        }
      })
      .then((customers) => {
        console.log("Clienti dal db", customers);
        dispatch({
          type: GET_CUSTOMERS,
          payload: customers,
        });
      })
      .catch((err) => {
        console.log("errore", err);
      });
  };
};
