import React, { useEffect } from "react";
import Logo from "../assets/LogoSVG1-cropped.svg";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import AvatarDropdown from "./MyPage/AvatarDropdown";

const Mynavbar = () => {
  const meDataFromReduxStore = useSelector((state) => state.me.userData);
  const isUserLoggedIn =
    !!meDataFromReduxStore && Object.keys(meDataFromReduxStore).length > 0;
  console.log("Is user logged in?", isUserLoggedIn);
  const pathname = window.location.pathname;

  useEffect(() => {
    // Verifica lo stato di autenticazione solo se l'app è completamente avviata
    if (localStorage.getItem) {
      console.log("Is user logged in?", isUserLoggedIn);
    }
  }, [isUserLoggedIn]); // Assicurati di dipendere solo dalle variabili necessarie
  const pages = ["", "servizi", "prenotazioni", "store", "contatti"];

  return (
    <Navbar className="drop-shadow-xl pt-2 myfont">
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
        {pages.map((page, index) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              href={`/${page}`}
              className={pathname === `/${page}` ? "active" : ""}
            >
              {page === ""
                ? "Home"
                : page.charAt(0).toUpperCase() + page.slice(1)}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        {isUserLoggedIn && (
          <NavbarItem>
            <AvatarDropdown meDataFromReduxStore={meDataFromReduxStore} />
          </NavbarItem>
        )}

        {!isUserLoggedIn && (
          <>
            <NavbarItem className="hidden lg:flex">
              <Link href="/login">Login</Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Registrati
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};

export default Mynavbar;
