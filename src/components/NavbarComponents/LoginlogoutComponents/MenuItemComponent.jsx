import React from "react";
import MenuItem from "@mui/material/MenuItem";
import { useSelector } from "react-redux";
import LoginButton from "../LoginButton";
import SignupButton from "../SignupButton";
import LogoutButton from "../LogoutButton";
import UserAvatar from "../UserAvatar";
import CreatePostButton from "../CreatePostButton";

const MenuItemComponent = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <>
      <MenuItem>
        <CreatePostButton
          display={{ xs: "block", sm: "block", md: "none", lg: "none" }}
        />
      </MenuItem>

      {!isLoggedIn && (
        <>
          <MenuItem>
            <LoginButton />
          </MenuItem>
          <MenuItem>
            <SignupButton />
          </MenuItem>
        </>
      )}

      {isLoggedIn && (
        <>
          <MenuItem>
            <LogoutButton />
          </MenuItem>
          <MenuItem textAlign="center">
            <UserAvatar />
          </MenuItem>
        </>
      )}
    </>
  );
};
export default MenuItemComponent;
