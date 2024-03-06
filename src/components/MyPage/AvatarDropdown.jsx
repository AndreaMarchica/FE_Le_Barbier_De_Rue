import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../../redux/actions/index";
import { useNavigate } from "react-router-dom";

const AvatarDropdown = ({ meDataFromReduxStore }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
    localStorage.clear();
    if (window.location.pathname !== "/home") {
      navigate("/home");
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
        <DropdownItem key="profile" className="h-14 gap-2" textValue="Profile">
          <p className="font-bold">Signed in as</p>
          <p className="font-bold">@{meDataFromReduxStore.username}</p>{" "}
        </DropdownItem>
        <DropdownItem key="personal" textValue="personal" href="/me">
          Area personale
        </DropdownItem>
        <DropdownItem key="settings" textValue="settings">
          Impostazioni
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
