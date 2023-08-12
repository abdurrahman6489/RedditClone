import { IconButton, Stack, Typography } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import React from "react";
import { useNavigate } from "react-router-dom";
const RouteButton = () => {
  const navigate = useNavigate();
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <IconButton
        id="home"
        size="large"
        color="primary"
        variant="outlined"
        onClick={() => navigate("/")}
      >
        <ArrowLeftIcon />
      </IconButton>
      <label htmlFor="home">
        <Typography variant="button">Home</Typography>
      </label>
    </Stack>
  );
};

export default RouteButton;
