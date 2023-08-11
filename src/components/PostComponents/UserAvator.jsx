import React from "react";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
const UserAvator = ({ userAvatar, username }) => {
  const currentUser = useSelector((state) => state.currentUser);
  const userNameFirstLetter =
    currentUser && username ? username?.split("")[0].toUpperCase() : null;
  return (
    <>
      {userAvatar && currentUser && <Avatar alt={username} src={userAvatar} />}
      {!userAvatar && currentUser && <Avatar>{userNameFirstLetter}</Avatar>}
    </>
  );
};

export default UserAvator;
