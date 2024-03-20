import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../../redux/actions/index";
import { useNavigate } from "react-router-dom";

const AvatarDropdown = ({ meDataFromReduxStore }) => {
  const isAdmin = useSelector((state) => state.me.userData.role === "ADMIN");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.clear();
    if (window.location.pathname !== "/") {
      navigate("/");
      window.location.reload();
    } else {
      window.location.reload();
    }
  };

  return (
    <Dropdown placement="bottom-start" className="myfont">
      <DropdownTrigger>
        {/* <User
          as="button"
          alt="avatar"
          avatarProps={{
            isBordered: true,
            src: meDataFromReduxStore.avatar,
          }}
          className="transition-transform"
          description={"@" + meDataFromReduxStore.username}
          name={meDataFromReduxStore.name + " " + meDataFromReduxStore.surname}
        /> */}
        <button className="transition-transform d-flex flex-row">
          <div>
            <img
              src={meDataFromReduxStore.avatar}
              alt="Avatar"
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            />
          </div>
          {/* <div>
            <p className="font-bold">
              Signed in as<br></br>@{meDataFromReduxStore.username}
            </p>
          </div> */}
        </button>
      </DropdownTrigger>
      <DropdownMenu aria-label="User Actions" variant="flat">
        <DropdownItem key="profile" textValue="Profile">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">@{meDataFromReduxStore.username}</p>{" "}
        </DropdownItem>
        <DropdownItem
          className="text-decoration-none"
          key="personal"
          textValue="personal"
          href="/me"
        >
          Area personale
        </DropdownItem>
        <DropdownItem
          className="text-decoration-none"
          key="admin"
          textValue="Admin"
          href="/gestionale"
          hidden={!isAdmin}
        >
          Pannello amministratore
        </DropdownItem>
        <DropdownItem
          key="logout"
          color="danger"
          textValue="Log Out"
          onClick={handleLogout}
        >
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};
export default AvatarDropdown;
