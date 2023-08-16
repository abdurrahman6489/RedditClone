import * as React from "react";
import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import Paper from "@mui/material/Paper";
import Badge from "@mui/material/Badge";
import { Fab, Tooltip } from "@mui/material";

import LoginButton from "./NavbarComponents/LoginButton";
import LogoutButton from "./NavbarComponents/LogoutButton";
import UserAvatar from "./NavbarComponents/UserAvatar";
import MenuItemComponent from "./NavbarComponents/LoginlogoutComponents/MenuItemComponent";
import CreatePostButton from "./NavbarComponents/CreatePostButton";
import SearchComponent from "./NavbarComponents/SearchComponent";
import RedditLogo from "./NavbarComponents/RedditLogo";
import CustomTheme from "./CustomTheme";
import MenuComponent from "./MenuComponent";
import SignUpLoginModal from "./HomePageComponents/SignUpLoginModal";
import FeatureComingSoon from "./FeatureComingSoon";

const APP_BAR_PRIMARY_COLOR = "#2a9461";
// const APP_BAR_SECONDARY_COLOR = "#494c7d";
// const APP_BAR_SECONDARY_COLOR = "hsl(237, 26%, 39%)";
const APP_BAR_SECONDARY_COLOR = "#FFF";

const Navbar = () => {
  const [open, setOpen] = useState(false);
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
        <AppBar position="fixed" color="secondary">
          <Toolbar>
            <MenuComponent />
            <RedditLogo />
            <SearchComponent />
            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{ display: { xs: "none", md: "flex" }, gap: "2em" }}
              alignItems="center"
            >
              <CustomTheme primaryColor="#FFF" secondaryColor="#FFF">
                <Tooltip
                  title="Advertise"
                  placement="bottom"
                  onClick={() => setOpen(true)}
                >
                  <Fab variant="extended" color="primary">
                    <CampaignOutlinedIcon />
                    Advertise
                  </Fab>
                </Tooltip>
              </CustomTheme>

              <Tooltip title="chat" placement="bottom">
                <Badge
                  badgeContent={4}
                  color="error"
                  onClick={() => setOpen(true)}
                >
                  <ChatBubbleOutlineIcon />
                </Badge>
              </Tooltip>
              <Tooltip title="Notification" placement="bottom">
                <Badge
                  badgeContent={2}
                  color="error"
                  onClick={() => setOpen(true)}
                >
                  <NotificationsNoneIcon fontSize="large" />
                </Badge>
              </Tooltip>

              <LoginButton />
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
            <FeatureComingSoon open={open} setOpen={setOpen} />
          </Toolbar>
        </AppBar>
        {renderMobileMenu}
        {renderMenu}
      </Box>
    </CustomTheme>
  );
};

export default Navbar;
