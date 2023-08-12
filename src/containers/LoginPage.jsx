import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, setMsg } from "../action";
import { signalProps } from "../Utils/utils";
import { routepath } from "../Utils/routepaths";
import RouteButton from "../components/RouteButton";
import { useNavigate } from "react-router-dom";
import GoogleLogin from "../components/GoogleLogin";

import { Divider, Typography, IconButton, Fab, Tooltip } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import CustomTheme from "../components/CustomTheme";

const SUCCESS_NAVIGATE_PAGE = routepath.home;
const { success } = signalProps;

const primaryColor = "#D93A00";

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

const LoginPage = ({ setOpen, setIsSignup }) => {
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
    } else setError("User doesn't exist");
    setUser({ username: "", password: "" });
    setOpen(false);
  };
  const handleClick = (event) => {
    event.preventDefault();
    setIsSignup(true);
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
      <CustomTheme primaryColor={primaryColor} secondaryColor={primaryColor}>
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
  );
};

export default LoginPage;
