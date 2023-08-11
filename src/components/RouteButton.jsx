import { IconButton, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import React from "react";
import { useNavigate } from "react-router-dom";
const RouteButton = ({ path, pathName, top, left }) => {
  const navigate = useNavigate();
  return (
    <IconButton
      size="large"
      color="primary"
      variant="outlined"
      sx={{ mt: { top }, ml: { left } }}
      onClick={() => navigate(path)}
    >
      <ArrowLeftIcon />
      <Typography variant="button">{pathName}</Typography>
    </IconButton>
  );
};

export default RouteButton;
