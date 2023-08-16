import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setMsg, openLoginModal, closeSignupModal } from "../action";
import { signalProps } from "../Utils/utils";
import GoogleLogin from "../components/GoogleLogin";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";

import { Divider, Typography, Fab, Tooltip, Modal, Box } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CustomTheme from "../components/CustomTheme";

const { success } = signalProps;
const primaryColor = "#D93A00";
const INITIAL_STATE = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
};

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

const signup_Btn_Style = {
  width: "100%",
  borderRadius: "1.5em",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  margin: "auto",
  marginBottom: "1vh",
  marginTop: "2vh",
};

const SignupPage = ({ setIsSignup }) => {
  const signupModal = useSelector((state) => state.signupModalOpen);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  const [user, setUser] = useState(INITIAL_STATE);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setUser((obj) => ({ ...obj, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(user).some((key) => user[key].length == 0)) {
      setError("Please fill all the fields");
      return;
    }
    const { username, password, firstName, lastName } = user;
    const userIndex = users.findIndex(
      (currentUser) => currentUser.username == username
    );
    if (userIndex == -1) {
      dispatch(
        setMsg(
          `Congratulations ${firstName}, You are successfully registered`,
          success
        )
      );
      dispatch(addUser({ username, password, firstName, lastName }));
      dispatch(closeSignupModal());
    } else {
      dispatch(
        setMsg(
          `You are already registered ${users[userIndex].firstName}, login from here`,
          warning
        )
      );
      dispatch(closeSignupModal());
      dispatch(openLoginModal());
    }
    setUser(INITIAL_STATE);
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(closeSignupModal());
    dispatch(openLoginModal());
  };

  const handleClose = () => dispatch(closeSignupModal());
  return (
    <Modal
      open={signupModal}
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
            Signup
          </Typography>
          <GoogleLogin msg={"Signup"} successMsg={"signedup"} />
          <Divider sx={{ marginBottom: "3vh" }}>OR</Divider>
          <FormControl
            sx={{
              width: { lg: "90%", md: "90%", sm: "100%", xs: "100%" },
              margin: "auto",
            }}
          >
            <TextField
              type="text"
              id="firstName"
              label="Firstname"
              name="firstName"
              value={user.firstName}
              color="primary"
              sx={{ mt: "2vh" }}
              onChange={handleChange}
            />
            <TextField
              type="text"
              id="lastname"
              label="Lastname"
              name="lastName"
              value={user.lastName}
              color="primary"
              sx={{ mt: "2vh" }}
              onChange={handleChange}
            />
            <TextField
              type="text"
              id="username"
              label="Username"
              name="username"
              value={user.username}
              color="primary"
              sx={{ mt: "2vh" }}
              onChange={handleChange}
            />
            <TextField
              id="password"
              type="password"
              value={user.password}
              name="password"
              autoComplete="current-password"
              label="Password"
              color="primary"
              sx={{ mt: "2vh" }}
              onChange={handleChange}
            />
            <Typography variant="body2" color="error">
              {error}
            </Typography>
            <CustomTheme
              primaryColor={primaryColor}
              secondaryColor={primaryColor}
            >
              <Tooltip onClick={handleSubmit} title="Signup">
                <Fab
                  color="primary"
                  aria-label="Signup"
                  variant="extended"
                  onClick={handleSubmit}
                  sx={signup_Btn_Style}
                >
                  <Typography variant="body2">Signup</Typography>
                </Fab>
              </Tooltip>
            </CustomTheme>
            <Typography variant="body2">
              Already a redditor?{" "}
              <span>
                <a href="" onClick={handleClick}>
                  Login
                </a>
              </span>
            </Typography>
          </FormControl>
        </Box>
      </Box>
    </Modal>
  );
};

export default SignupPage;
