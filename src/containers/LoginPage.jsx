import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, setMsg } from "../action";
import { signalProps } from "../Utils/utils";
import { routepath } from "../Utils/routepaths";
import RouteButton from "../components/RouteButton";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";

import { Button, Divider, Typography, IconButton, Stack } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

const SUCCESS_NAVIGATE_PAGE = routepath.home;
const { success } = signalProps;

const LoginPage = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);
  // console.log(users);
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
      navigate(SUCCESS_NAVIGATE_PAGE);
    } else setError("User doesn't exist");
    setUser({ username: "", password: "" });
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
            Sign in
          </Typography>
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
            Sign in
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
        <GoogleLogin msg="Signin" successMsg="signedin" />
        <Typography variant="body1">Not an existing user yet?</Typography>
        <IconButton
          size="large"
          aria-label="Signup"
          onClick={() => navigate(routepath.signup)}
        >
          <Typography variant="button" color="primary">
            Signup
          </Typography>
        </IconButton>
      </Stack>
    </>
  );
};

export default LoginPage;
