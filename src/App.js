import "./App.css";
import Homepage from "./components/Homepage";
import Mynavbar from "./components/MyNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservations from "./components/ReservationsPage/Reservations";
import Login from "./components/LoginPage/Login";

function App() {
  return (
    <BrowserRouter>
      <Mynavbar></Mynavbar>
      <Routes>
        <Route element={<Homepage></Homepage>} path="/"></Route>
        <Route element={<Login></Login>} path="/login"></Route>
        <Route
          element={<Reservations></Reservations>}
          path="/reservations"
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
