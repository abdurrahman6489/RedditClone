import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addUser, setMsg } from "../action";
import { signalProps } from "../utils";
import { routepath } from "../routepaths";
import { Link, useNavigate } from "react-router-dom";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import {
  Button,
  Container,
  Divider,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import Chip from "@mui/material/Chip";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const SUCCESS_NAVIGATE_PAGE = routepath.home;
const LOGIN_PAGE = routepath.login;
let currentPath = SUCCESS_NAVIGATE_PAGE;
const { success, warning } = signalProps;
const FORM_CONTAINER_STYLE = {
  maxWidth: "95%",
  width: "90%",
  aspectRatio: "1/1.5",
  mt: "5vh",
  padding: "1em",
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
    <Container maxWidth="sm" sx={{ mt: "10vh", textAlign: "center" }}>
      <Chip
        icon={<ArrowLeftIcon />}
        label="Home"
        color="success"
        variant="outlined"
        onClick={() => navigate(routepath.home)}
      />
      <Typography variant="h4" sx={{ color: "#AA4A44" }}>
        Sign up
      </Typography>
      <Grid
        justifyContent="center"
        alignItems="center"
        container
        sx={{ maxHeight: "100vh" }}
      >
        <Grid item>
          <FormControl sx={FORM_CONTAINER_STYLE}>
            <TextField
              type="text"
              id="outlined-required"
              label="firstname"
              name="firstName"
              value={user.firstName}
              color="success"
              sx={{ mt: "2vh" }}
              onChange={handleChange}
            />
            <TextField
              type="text"
              id="outlined-required"
              label="lastname"
              name="lastName"
              value={user.lastName}
              color="success"
              sx={{ mt: "2vh" }}
              onChange={handleChange}
            />
            <TextField
              type="text"
              id="outlined-required"
              label="username"
              name="username"
              value={user.username}
              color="success"
              sx={{ mt: "2vh" }}
              onChange={handleChange}
            />
            <TextField
              id="outlined-password-input"
              type="password"
              label="password"
              name="password"
              value={user.password}
              autoComplete="current-password"
              color="success"
              sx={{ mt: "2vh" }}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              sx={{ mt: "2vh" }}
            >
              Sign up
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </FormControl>
          <Typography variant="body2">
            Already an existing user?
            <Link to={routepath.login}>
              <p style={{ color: "blue" }}>Signin</p>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupPage;
