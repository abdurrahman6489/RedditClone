import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { routepath } from "../../Utils/routepaths";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
const SIGNUP_PATH = routepath.signup;

const SignupButton = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <>
      {!isLoggedIn && (
        <Link to={SIGNUP_PATH}>
          <IconButton
            size="large"
            aria-label="Signup"
            color="inherit"
            sx={{ color: { xs: "#333", sm: "#333", md: "#FFF", lg: "#FFF" } }}
          >
            <Typography variant="body1">Signup</Typography>
          </IconButton>
        </Link>
      )}
    </>
  );
};

export default SignupButton;
