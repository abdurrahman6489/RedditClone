import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";

import AllInboxIcon from "@mui/icons-material/AllInbox";
import HomeIcon from "@mui/icons-material/Home";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";
import PostAddIcon from "@mui/icons-material/PostAdd";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { filterPost, setMsg } from "../../action";
import { routepath } from "../../Utils/routepaths";
import { signalProps } from "../../Utils/utils";

const SUCCESS_PATH = routepath.createPost;
const LOGIN_PATH = routepath.login;
const { warning } = signalProps;

const Sidebar = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const [selected, setSelected] = useState(-1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleFilterPost = (label) => {
    dispatch(filterPost(label));
  };

  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: { xs: "none", sm: "none", md: "block", lg: "block" },
        mt: 7,
      }}
    >
      <Box position="fixed">
        <List>
          <ListItem disablePadding>
            <ListItemButton
              selected={selected === 1}
              onClick={(event) => {
                setSelected(1);
                handleFilterPost("Home");
              }}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selected === 2}
              onClick={(event) => {
                setSelected(2);
                handleFilterPost("Popular");
              }}
            >
              <ListItemIcon>
                <ArrowOutwardIcon />
              </ListItemIcon>
              <ListItemText primary="Popular" />
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              selected={selected === 3}
              onClick={(event) => {
                setSelected(3);
                handleFilterPost("All");
              }}
            >
              <ListItemIcon>
                <AllInboxIcon />
              </ListItemIcon>
              <ListItemText primary="All" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
