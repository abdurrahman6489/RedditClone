import React, { useState } from "react";
import { auth, provider } from "../firebase";
import { signInWithPopup } from "@firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, setMsg, loginWithGoogle } from "../action";
import { useNavigate } from "react-router-dom";
import { routepath } from "../routepaths";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Typography,
  Grid,
  Box,
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import GoogleIcon from "@mui/icons-material/Google";
import Chip from "@mui/material/Chip";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";

const SUCCESS_NAVIGATE_PAGE = routepath.home;

const FORM_CONTAINER_STYLE = {
  maxWidth: "95%",
  width: "90%",
  aspectRatio: "1/1.5",
  mt: "10vh",
  padding: "1em",
};

const BTN_STYLE = {
  height: "40px",
  backgroundColor: "#1976d2",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  fontSize: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "1em",
};

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
      dispatch(setMsg("Login successful"));
      dispatch(loginUser(username, password, userIndex));
      navigate(SUCCESS_NAVIGATE_PAGE);
    } else setError("User doesn't exist");
    setUser({ username: "", password: "" });
  };
  const onLoginClick = () => {
    console.log("clicked");
    signInWithPopup(auth, provider)
      .then((result) => {
        // console.log("result ", result);
        const userName = result.user.displayName;
        const fullName = userName.split(" ");
        const firstName = fullName[0];
        const lastName = fullName[1];
        dispatch(loginWithGoogle(userName, firstName, lastName));
        navigate(SUCCESS_NAVIGATE_PAGE);
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  return (
    <Container maxWidth="sm" sx={{ mt: "15vh", textAlign: "center" }}>
      <Chip
        icon={<ArrowLeftIcon />}
        label="Home"
        color="success"
        variant="outlined"
        sx={{ mb: "1vh" }}
        onClick={() => navigate(routepath.home)}
      />
      <Grid
        justifyContent="center"
        alignItems="center"
        container
        sx={{ maxHeight: "100vh" }}
      >
        <Grid item>
          <Button
            sx={BTN_STYLE}
            variant="contained"
            startIcon={<GoogleIcon />}
            onClick={onLoginClick}
          >
            Signin with Google
          </Button>
        </Grid>
        <Divider />
        <Grid item>
          <FormControl sx={FORM_CONTAINER_STYLE}>
            <Typography variant="h4" sx={{ color: "#AA4A44" }}>
              Sign in
            </Typography>
            <TextField
              type="text"
              id="outlined-required"
              label="Username"
              value={user.username}
              color="success"
              sx={{ mt: "2vh" }}
              onChange={(event) =>
                setUser((user) => ({ ...user, username: event.target.value }))
              }
            />
            <TextField
              id="outlined-password-input"
              type="password"
              value={user.password}
              autoComplete="current-password"
              label="Password"
              color="success"
              sx={{ mt: "2vh" }}
              onChange={(event) =>
                setUser((user) => ({ ...user, password: event.target.value }))
              }
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              sx={{ mt: "2vh" }}
            >
              Sign in
            </Button>
            {error && <p style={{ color: "red" }}>{error}</p>}
          </FormControl>
          <Typography variant="body2">
            Not an existing user yet?
            <Link to={routepath.signup}>
              <p style={{ color: "blue" }}>Signup</p>
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LoginPage;
