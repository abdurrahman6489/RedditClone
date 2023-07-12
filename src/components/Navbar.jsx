import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RedditIcon from "@mui/icons-material/Reddit";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routepath } from "../routepaths";
import { userLogout, setMsg } from "../action";
import { signalProps } from "../utils";
const pages = [
  { routename: "Create Post", path: routepath.createPost },
  { routename: "Login", path: routepath.login },
  { routename: "Signup", path: routepath.signup },
];

const SUCCESS_PATH = routepath.createPost;
const LOGIN_PATH = routepath.login;
const SIGNUP_PATH = routepath.signup;
const { warning } = signalProps;

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const username = useSelector((state) => state.currentUser.firstName);
  const userFirstLetter = username.charAt(0).toUpperCase();
  const navigate = useNavigate();
  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(setMsg("You are not logged in, please login first", warning));
      navigate(LOGIN_PATH);
      return;
    }
  };

  return (
    <AppBar position="static" sx={{ mb: "3vh" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to={routepath.home}>
            <Avatar sx={{ bgColor: "red" }}>
              <RedditIcon />
            </Avatar>
          </Link>
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            reddit
          </Typography>
          <Stack spacing={2} direction="row">
            <Link to={isLoggedIn ? SUCCESS_PATH : LOGIN_PATH}>
              <Button sx={{ color: "#fff" }} onClick={handleClick}>
                Create Post
              </Button>
            </Link>
            {!isLoggedIn && (
              <Link to={LOGIN_PATH}>
                <Button sx={{ color: "#fff" }}>Login</Button>
              </Link>
            )}
            {!isLoggedIn && (
              <Link to={SIGNUP_PATH}>
                <Button sx={{ color: "#fff" }}>Signup</Button>
              </Link>
            )}
          </Stack>
          {isLoggedIn && (
            <Box sx={{ display: { xs: "none", sm: "Block" } }}>
              <Button
                sx={{ color: "#fff" }}
                onClick={() => dispatch(userLogout())}
              >
                Logout
              </Button>
            </Box>
          )}
          {isLoggedIn && (
            <Avatar sx={{ bgcolor: "orange" }}>{userFirstLetter}</Avatar>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
