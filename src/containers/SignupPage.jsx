import React, { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setMsg } from "../action";
import { signalProps } from "../Utils/utils";

import GoogleLogin from "../components/GoogleLogin";

import { Box, Divider, Tooltip, Typography, Fab } from "@mui/material";

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

const SignupPage = ({ setOpen, setIsSignup }) => {
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
      setOpen(false);
    } else {
      dispatch(
        setMsg(
          `You are already registered ${users[userIndex].firstName}, login from here`,
          warning
        )
      );
    }
    setUser(INITIAL_STATE);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setIsSignup(false);
  };
  return (
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
      <CustomTheme primaryColor={primaryColor} secondaryColor={primaryColor}>
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
  );
};

export default SignupPage;
