import React, { useState } from "react";

import { Box, Modal, Typography, Fab, Divider, Button } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Stack, styled, TextField, FormControl, Tooltip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import CustomTheme from "../CustomTheme";
import GoogleLogin from "../GoogleLogin";
import SignupPage from "../../containers/SignupPage";
import LoginPage from "../../containers/LoginPage";
import { addUser, setMsg } from "../../action";
import { signalProps } from "../../Utils/utils";

const primaryColor = "#D93A00";
const { success } = signalProps;
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { lg: "60%", md: "70%", sm: "80%", xs: "90%" },
  maxWidth: 400,
  bgcolor: "background.paper",
  borderRadius: "1em",
  boxShadow: 24,
  p: 4,
  paddingTop: 5,
};

const SignUpLoginModal = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [open, setOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(true);

  const handleOpen = () => {
    console.log("clicked login button");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);
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

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Tooltip
            onClick={handleClose}
            placement="top"
            title="Close"
            sx={{
              position: "fixed",
              top: 20,
              right: 20,
            }}
          >
            <Fab size="small" color="error">
              <DisabledByDefaultIcon />
            </Fab>
          </Tooltip>

          <Box sx={{ padding: "0.5em", mt: 5, textAlign: "center" }}>
            <Typography variant="h6" mb={2}>
              {isSignup ? "Signup" : "Login"}
            </Typography>
            <GoogleLogin
              msg={isSignup ? "Signup" : "Login"}
              successMsg={isSignup ? "signedup" : "loggedin"}
              setOpen={setOpen}
            />
            <Divider sx={{ marginBottom: "3vh" }}>OR</Divider>
            {isSignup && (
              <SignupPage setOpen={setOpen} setIsSignup={setIsSignup} />
            )}
            {!isSignup && (
              <LoginPage setOpen={setOpen} setIsSignup={setIsSignup} />
            )}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SignUpLoginModal;
