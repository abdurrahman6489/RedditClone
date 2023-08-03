import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routepath } from "../../routepaths";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
const LOGIN_PATH = routepath.login;
const LoginButton = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>
      {!isLoggedIn && (
        <Link to={LOGIN_PATH}>
          <IconButton
            size="large"
            aria-label="Login"
            color="inherit"
            sx={{ color: { xs: "#333", sm: "#333", md: "#FFF", lg: "#FFF" } }}
          >
            <Typography variant="body1">Login</Typography>
          </IconButton>
        </Link>
      )}
    </>
  );
};

export default LoginButton;
