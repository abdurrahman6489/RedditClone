import React, { useState } from "react";
import { auth, provider } from "../Utils/firebase";
import { signInWithPopup } from "@firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { setMsg, loginWithGoogle } from "../action";
import { signalProps } from "../Utils/utils";
import { routepath } from "../Utils/routepaths";
import RouteButton from "../components/RouteButton";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";

import { Button, Divider, Typography, IconButton, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";

const SUCCESS_NAVIGATE_PAGE = routepath.home;
const { success } = signalProps;

const BTN_STYLE = {
  width: { lg: "30%", md: "40%" },
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  marginBottom: "3vh",
};

const INITIAL_STATE = {
  username: "",
  password: "",
  firstName: "",
  lastName: "",
};

const SignupPage = () => {
  const navigate = useNavigate();
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
    } else {
      currentPath = LOGIN_PAGE;
      dispatch(
        setMsg(
          `You are already registered ${users[userIndex].firstName}, login from here`,
          warning
        )
      );
    }
    navigate(currentPath);
    setUser(INITIAL_STATE);
  };

  return (
    <>
      <RouteButton path={routepath.home} pathName="Home" left="2vw" top="5vh" />
      <Stack
        direction="column"
        gap={"1em"}
        justifyContent={"center"}
        alignItems={"center"}
        flex={4}
        sx={{ mt: "4vh", textAlign: "center" }}
      >
        <LockOutlinedIcon fontSize="large" color="primary" />
        <FormControl
          sx={{
            width: { lg: "30%", md: "40%", sm: "50%", xs: "50%" },
          }}
        >
          <Typography variant="h4" color="primary">
            Signup
          </Typography>
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
          <Button
            id="signin"
            color="primary"
            variant="outlined"
            onClick={handleSubmit}
            sx={{ mt: "2vh" }}
          >
            Sign up
          </Button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </FormControl>
        <Divider
          sx={{
            mt: "5vh",
            mb: "5vh",
            width: { lg: "30%", md: "40%", sm: "50%", xs: "50%" },
          }}
        >
          OR
        </Divider>
        <GoogleLogin msg="Signup" successMsg="signedup" />
        <Typography variant="body1">Already a user?</Typography>
        <IconButton
          size="large"
          aria-label="signin"
          onClick={() => navigate(routepath.login)}
        >
          <Typography variant="button" color="primary">
            Signin
          </Typography>
        </IconButton>
      </Stack>
    </>
  );
};

export default SignupPage;
