import "./reset.css";
import "./App.css";
import Homepage from "./components/Homepage/Homepage";
import Mynavbar from "./components/MyNavbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservations from "./components/ReservationsPage/Reservations";
import Login from "./components/LoginPage/Login";
import Register from "./components/RegisterPage/Register";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getMeDataAction, loginAction } from "./redux/actions";
import MyFooter from "./components/MyFooter";
import MyPage from "./components/MyPage/MyPage";
import ContactsPage from "./components/ContactsPage/ContactsPage";
import ServicesPage from "./components/ServicesPage/ServicesPage";
import ShopPage from "./components/ShopPage/ShopPage";
import ControlPanel from "./components/ControlPanel/ControlPanel";

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
        <Route element={<Homepage></Homepage>} path="/home"></Route>
        <Route element={<Login></Login>} path="/login"></Route>
        <Route element={<Register></Register>} path="/register"></Route>
        <Route element={<MyPage></MyPage>} path="/me"></Route>
        <Route element={<ContactsPage></ContactsPage>} path="/contatti"></Route>
        <Route
          element={<Reservations></Reservations>}
          path="/prenotazioni"
        ></Route>
        <Route element={<ServicesPage></ServicesPage>} path="/servizi"></Route>
        <Route element={<ShopPage></ShopPage>} path="/store"></Route>
        <Route
          element={<ControlPanel></ControlPanel>}
          path="/gestionale"
        ></Route>
      </Routes>
      {window.location.pathname !== "/servizi" && <MyFooter />}
    </BrowserRouter>
  );
}

export default App;
