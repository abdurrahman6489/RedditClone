import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openLoginModal } from "../../action";
import { routepath } from "../../Utils/routepaths";

import CustomTheme from "../CustomTheme";
import { Fab, Tooltip } from "@mui/material";

const primaryColor = "#D93A00";
const LoginButton = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const handleOpen = () => {
    dispatch(openLoginModal());
  };

  return (
    <>
      {!isLoggedIn && (
        <CustomTheme primaryColor={primaryColor} secondaryColor={primaryColor}>
          <Tooltip onClick={handleOpen} title="Login">
            <Fab color="primary" variant="extended" aria-label="Create Post">
              Login
            </Fab>
          </Tooltip>
        </CustomTheme>
      )}
    </>
  );
};

export default LoginButton;
