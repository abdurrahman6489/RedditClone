import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, setMsg, closeLoginModal, openSignupModal } from "../action";
import { signalProps } from "../Utils/utils";

import { Divider, Typography, Fab, Tooltip, Modal, Box } from "@mui/material";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CustomTheme from "../components/CustomTheme";
import GoogleLogin from "../components/GoogleLogin";

const { success } = signalProps;

const primaryColor = "#D93A00";

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

const login_Btn_Style = {
  width: "100%",
  borderRadius: "1.5em",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  margin: "auto",
  marginBottom: "1vh",
  marginTop: "2vh",
};

const LoginPage = () => {
  const logInModalOpen = useSelector((state) => state.logInModalOpen);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [user, setUser] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = user;
    if (Object.keys(user).some((key) => user[key].length == 0)) {
      setError("Please fill all the fields");
      return;
    }
    const userIndex = users.findIndex(
      (currentUser) =>
        currentUser.username == username && currentUser.password == password
    );
    if (userIndex > -1) {
      dispatch(
        setMsg(
          `Congratulatios ${username}, you are successfully loggedin`,
          success
        )
      );
      dispatch(loginUser(username, password, userIndex));
    } else setError("Invalid username or password");
    setUser({ username: "", password: "" });
  };
  const handleClose = () => dispatch(closeLoginModal());

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(closeLoginModal());
    dispatch(openSignupModal());
  };

  return (
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
          <FormControl
            sx={{
              width: { lg: "90%", md: "90%", sm: "100%", xs: "100%" },
              margin: "auto",
            }}
          >
            <TextField
              type="text"
              id="username"
              label="Username"
              value={user.username}
              color="primary"
              sx={{ mt: "2vh" }}
              onChange={(event) =>
                setUser((user) => ({ ...user, username: event.target.value }))
              }
            />
            <TextField
              id="password"
              type="password"
              value={user.password}
              autoComplete="current-password"
              label="Password"
              color="primary"
              sx={{ mt: "2vh" }}
              onChange={(event) =>
                setUser((user) => ({ ...user, password: event.target.value }))
              }
            />
            <Typography variant="body2" color="error">
              {error}
            </Typography>
            <CustomTheme
              primaryColor={primaryColor}
              secondaryColor={primaryColor}
            >
              <Tooltip onClick={handleSubmit} title="Login">
                <Fab
                  color="primary"
                  aria-label="Signup"
                  variant="extended"
                  onClick={handleSubmit}
                  sx={login_Btn_Style}
                >
                  <Typography variant="body2">Login</Typography>
                </Fab>
              </Tooltip>
            </CustomTheme>

            <Typography variant="body2">
              Not an existing user yet?{" "}
              <span>
                <a href="" onClick={handleClick}>
                  Signup
                </a>
              </span>
            </Typography>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoginPage;
