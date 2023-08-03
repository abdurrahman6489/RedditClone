import React from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
const UserAvatar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const username = useSelector((state) => state.currentUser.firstName);
  const userFirstLetter = username.charAt(0).toUpperCase();

  return (
    <>
      {isLoggedIn && (
        <IconButton
          size="large"
          aria-label="Avatar"
          color="inherit"
          sx={{ margin: "auto" }}
        >
          <Avatar sx={{ bgcolor: "orange" }}>{userFirstLetter}</Avatar>
        </IconButton>
      )}
    </>
  );
};

export default UserAvatar;
