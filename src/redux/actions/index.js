export const GET_ME = "GET_ME";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

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
