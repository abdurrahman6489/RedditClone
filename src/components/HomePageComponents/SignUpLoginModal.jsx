import React, { useState } from "react";

import { Box, Modal, Typography, Fab, Divider, Button } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { Tooltip } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import CustomTheme from "../CustomTheme";
import GoogleLogin from "../GoogleLogin";
import SignupPage from "../../containers/SignupPage";
import LoginPage from "../../containers/LoginPage";
import { closeLoginModal } from "../../action";

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
  const logInModalOpen = useSelector((state) => state.logInModalOpen);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeLoginModal());
  return (
    <>
      <Modal
        open={logInModalOpen}
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
              Login
            </Typography>
            <GoogleLogin msg={"Login"} successMsg={"loggedin"} />
            <Divider sx={{ marginBottom: "3vh" }}>OR</Divider>
            <LoginPage />
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default SignUpLoginModal;
