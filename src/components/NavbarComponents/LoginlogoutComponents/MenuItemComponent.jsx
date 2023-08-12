import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import LoginButton from "../LoginButton";
import SignupButton from "../SignupButton";
import LogoutButton from "../LogoutButton";
import UserAvatar from "../UserAvatar";
import CreatePostButton from "../CreatePostButton";
import SignUpLoginModal from "../../HomePageComponents/SignUpLoginModal";

const MenuItemComponent = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      {!isLoggedIn && (
        <>
          <MenuItem sx={{ textAlign: "center" }}>
            <SignUpLoginModal />
          </MenuItem>
        </>
      )}

      {isLoggedIn && (
        <>
          <MenuItem sx={{ textAlign: "center" }}>
            <UserAvatar />
          </MenuItem>
        </>
      )}
    </>
  );
};
export default MenuItemComponent;
