import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import Paper from "@mui/material/Paper";

import LoginButton from "./NavbarComponents/LoginButton";
import SignupButton from "./NavbarComponents/SignupButton";
import LogoutButton from "./NavbarComponents/LogoutButton";
import UserAvatar from "./NavbarComponents/UserAvatar";
import MenuItemComponent from "./NavbarComponents/LoginlogoutComponents/MenuItemComponent";
import CreatePostButton from "./NavbarComponents/CreatePostButton";
import SearchComponent from "./NavbarComponents/SearchComponent";
import RedditLogo from "./NavbarComponents/RedditLogo";
import CustomTheme from "./CustomTheme";

const APP_BAR_PRIMARY_COLOR = "#2a9461";
const APP_BAR_SECONDARY_COLOR = "#494c7d";
// const APP_BAR_SECONDARY_COLOR = "#FF0000";

const Navbar = () => {
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
      <MenuItemComponent />
    </Menu>
  );

  return (
    <CustomTheme
      primaryColor={APP_BAR_PRIMARY_COLOR}
      secondaryColor={APP_BAR_SECONDARY_COLOR}
    >
      <Box sx={{ flexGrow: 1, p: 0, m: 0 }}>
        <AppBar position="static" color="secondary">
          <Toolbar>
            <RedditLogo />
            <CreatePostButton
              display={{ xs: "none", sm: "none", md: "block", lg: "block" }}
            />
            <SearchComponent />
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{ display: { xs: "none", md: "flex" } }}
              alignItems="center"
            >
              <LoginButton />
              <SignupButton />
              <LogoutButton />
              <UserAvatar />
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
    </CustomTheme>
  );
};

export default Navbar;
