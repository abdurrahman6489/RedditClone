import React from "react";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
const Username = ({ username, variant }) => {
  const currentUser = useSelector((state) => state.currentUser);
  let userChipLabel =
    currentUser && username == currentUser.username
      ? `${username} (you)`
      : username;
  //   let userChipLabel = "Terry";

  return currentUser ? (
    <Typography variant={variant}>{userChipLabel}</Typography>
  ) : null;
};

export default Username;
