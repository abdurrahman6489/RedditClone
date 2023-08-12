import React, { useState } from "react";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Box, Menu, MenuItem, Tooltip } from "@mui/material";

import LogoutButton from "./LogoutButton";

const UserAvatar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const username = useSelector((state) => state.currentUser.firstName);
  const userPhoto = useSelector((state) => state.currentUser.photoURL);
  const userFirstLetter = username.charAt(0).toUpperCase();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <>
      {isLoggedIn && (
        <Box sx={{ flexGrow: 0 }}>
          <Tooltip title="User" placement="bottom">
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              {!userPhoto && (
                <Avatar sx={{ bgcolor: "orange" }}>{userFirstLetter}</Avatar>
              )}
              {userPhoto && <Avatar alt={username} src={userPhoto} />}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem key={"profile"} onClick={handleCloseUserMenu}>
              <LogoutButton />
            </MenuItem>
          </Menu>
        </Box>
      )}
    </>
  );
};

export default UserAvatar;
