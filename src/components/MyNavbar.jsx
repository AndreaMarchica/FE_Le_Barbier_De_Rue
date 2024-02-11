import React from "react";
import Logo from "../assets/LBDRLogo.png";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  User,
  Avatar,
} from "@nextui-org/react";
import { useSelector } from "react-redux";

const Mynavbar = () => {
  const meDataFromReduxStore = useSelector((state) => state.me.userData);
  const isUserLoggedIn = !!meDataFromReduxStore;

  return (
    <Navbar>
      <NavbarBrand>
        <div className="max-w-xxs mx-auto">
          <img
            src={Logo}
            alt="logo"
            className="w-full h-auto object-contain max-h-16 py-2"
          />
        </div>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4 ml-5" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Prenotazioni
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Prodotti
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Contatti
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="/login">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
        {isUserLoggedIn && ( // Mostra il componente User solo se l'utente è loggato
          <>
            <NavbarItem>
              <Avatar src={meDataFromReduxStore.avatar} />
            </NavbarItem>
            <NavbarItem>{meDataFromReduxStore.name}</NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};
export default Mynavbar;
