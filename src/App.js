import "./App.css";
import Homepage from "./components/Homepage";
import Mynavbar from "./components/MyNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservations from "./components/ReservationsPage/Reservations";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMeDataAction, loginAction } from "./redux/actions";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      dispatch(loginAction());
      dispatch(getMeDataAction());
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Mynavbar></Mynavbar>
      <Routes>
        <Route element={<Homepage></Homepage>} path="/"></Route>
        <Route element={<Login></Login>} path="/login"></Route>
        <Route element={<Register></Register>} path="/register"></Route>
        <Route
          element={<Reservations></Reservations>}
          path="/reservations"
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
