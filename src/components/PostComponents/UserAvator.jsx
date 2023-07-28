import React from 'react'
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import { useSelector } from "react-redux";
const UserAvator = ({userAvatar, username}) => {
    const currentUser = useSelector((state) => state.currentUser);
    let userChipLabel = username == currentUser.username ? `${username} (you)` : username;
  const userNameFirstLetter = username.split("")[0].toUpperCase();
  return (
        <Chip
            avatar={
              userAvatar ? (
                <Avatar alt={username} src={userAvatar} />
              ) : (
                <Avatar>{userNameFirstLetter}</Avatar>
              )
            }
            label={userChipLabel}
            variant="outlined"
            size="medium"
            sx={{ mt: 2 }}
        />
  )
}

export default UserAvator