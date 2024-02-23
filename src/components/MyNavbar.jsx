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
import AvatarDropdown from "./MyPage/AvatarDropdown";

const Mynavbar = () => {
  const meDataFromReduxStore = useSelector((state) => state.me.userData);
  const isUserLoggedIn = !!meDataFromReduxStore;
  const pathname = window.location.pathname;

  const pages = ["home", "servizi", "prenotazioni", "store", "contatti"];

  return (
    <Navbar className="drop-shadow-xl pt-2">
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
        {pages.map((page) => (
          <NavbarItem key={page}>
            <Link
              color="foreground"
              href={`/${page}`}
              className={pathname.includes(page) ? "active" : ""}
            >
              {page.charAt(0).toUpperCase() + page.slice(1)}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          {isUserLoggedIn ? null : <Link href="/login">Login</Link>}
        </NavbarItem>
        <NavbarItem>
          {isUserLoggedIn ? null : (
            <Button as={Link} color="primary" href="/register" variant="flat">
              Registrati
            </Button>
          )}
        </NavbarItem>
        {isUserLoggedIn && (
          <>
            <NavbarItem>
              <AvatarDropdown
                meDataFromReduxStore={meDataFromReduxStore}
              ></AvatarDropdown>{" "}
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
};
export default Mynavbar;
