import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Stack } from "@mui/material";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import RedditIcon from "@mui/icons-material/Reddit";
import PostAddIcon from "@mui/icons-material/PostAdd";
import { deepOrange } from "@mui/material/colors";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { routepath } from "../routepaths";
import { userLogout, setMsg, filterPost } from "../action";
import { signalProps, filterObject } from "../utils";
const pages = [
  { routename: "Create Post", path: routepath.createPost },
  { routename: "Login", path: routepath.login },
  { routename: "Signup", path: routepath.signup },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "40dvw",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  width: "40dvw",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "40dvw",
    [theme.breakpoints.up("md")]: {
      width: "40dvw",
    },
  },
}));

const SUCCESS_PATH = routepath.createPost;
const LOGIN_PATH = routepath.login;
const SIGNUP_PATH = routepath.signup;
const { warning } = signalProps;
const searchIndex = Object.keys(filterObject).indexOf("Search");
const searchLabel = filterObject["Search"]["label"];

const Navbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const username = useSelector((state) => state.currentUser.firstName);
  const userFirstLetter = username.charAt(0).toUpperCase();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (event) => {
    let value = event.target.value;
    setSearchQuery(value);
    if (value.length == 0) {
      dispatch(filterPost("Best", 1));
      return;
    }
    dispatch(filterPost(searchLabel, searchIndex, value));
  };

  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(setMsg("You are not logged in, please login first", warning));
      navigate(LOGIN_PATH);
      return;
    }
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {!isLoggedIn && (
        <MenuItem>
          <Link to={LOGIN_PATH}>
            <IconButton
              size="large"
              aria-label="Login"
              color="inherit"
              sx={{ color: "#333" }}
            >
              <Typography variant="h6">Login</Typography>
            </IconButton>
          </Link>
        </MenuItem>
      )}
      {!isLoggedIn && (
        <MenuItem>
          <Link to={SIGNUP_PATH}>
            <IconButton
              size="large"
              aria-label="Signup"
              color="inherit"
              sx={{ color: "#333" }}
            >
              <Typography variant="h6">Signup</Typography>
            </IconButton>
          </Link>
        </MenuItem>
      )}
      {isLoggedIn && (
        <MenuItem>
          <IconButton
            size="large"
            aria-label="Login"
            color="inherit"
            onClick={() => dispatch(userLogout())}
          >
            <Typography variant="h6">Logout</Typography>
          </IconButton>
        </MenuItem>
      )}
      <MenuItem textAlign="center">
        {isLoggedIn && (
          <IconButton
            size="large"
            aria-label="Avatar"
            color="inherit"
            sx={{ margin: "auto" }}
          >
            <Avatar sx={{ bgcolor: "orange" }} textAlign="center">
              {userFirstLetter}
            </Avatar>
          </IconButton>
        )}
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Link to={routepath.home}>
            <Avatar sx={{ bgcolor: deepOrange[500] }}>
              <RedditIcon />
            </Avatar>
          </Link>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              ml: "3dvw",
              display: { xs: "none", sm: "block", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            reddit
          </Typography>
          <Link to={isLoggedIn ? SUCCESS_PATH : LOGIN_PATH}>
            <Button sx={{ color: "#fff" }} onClick={handleClick}>
              Create Post
            </Button>
          </Link>
          <Search>
            <SearchIconWrapper>
              <SearchIcon sx={{ position: "absolute", right: "2dvw" }} />
            </SearchIconWrapper>
            <StyledInputBase
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search…"
              inputProps={{
                "aria-label": "search",
              }}
            />
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }} alignItems="center">
            {!isLoggedIn && (
              <Link to={LOGIN_PATH}>
                <IconButton
                  size="large"
                  aria-label="Login"
                  color="inherit"
                  sx={{ color: "#FFF" }}
                >
                  <Typography variant="h6">Login</Typography>
                </IconButton>
              </Link>
            )}
            {!isLoggedIn && (
              <Link to={SIGNUP_PATH}>
                <IconButton
                  size="large"
                  aria-label="Signup"
                  color="inherit"
                  sx={{ color: "#FFF" }}
                >
                  <Typography variant="h6">Signup</Typography>
                </IconButton>
              </Link>
            )}
            {isLoggedIn && (
              <IconButton
                size="large"
                aria-label="Login"
                color="inherit"
                onClick={() => dispatch(userLogout())}
              >
                <Typography variant="h6">Logout</Typography>
              </IconButton>
            )}
            {isLoggedIn && (
              <Avatar sx={{ bgcolor: "orange" }}>{userFirstLetter}</Avatar>
            )}
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar;
