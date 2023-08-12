import React, { useState } from "react";
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
} from "@mui/material";
import ScienceIcon from "@mui/icons-material/Science";
import GroupIcon from "@mui/icons-material/Group";
import RedditIcon from "@mui/icons-material/Reddit";
import FeatureComingSoon from "./FeatureComingSoon";
const Community = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(-1);

  const handleClick = (selectedNo) => {
    setSelected(selectedNo);
    setOpen(true);
  };
  return (
    <>
      <List
        subheader={
          <Typography variant="body2" color="gray">
            Communities
          </Typography>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            selected={selected === 1}
            onClick={(event) => {
              handleClick(1);
            }}
          >
            <ListItemIcon>
              <RedditIcon />
            </ListItemIcon>
            <ListItemText primary="r/annoucements" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selected === 2}
            onClick={(event) => {
              handleClick(2);
            }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary="r/social" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={selected === 3}
            onClick={(event) => {
              handleClick(3);
            }}
          >
            <ListItemIcon>
              <ScienceIcon />
            </ListItemIcon>
            <ListItemText primary="r/science" />
          </ListItemButton>
        </ListItem>
      </List>
      <FeatureComingSoon open={open} setOpen={setOpen} />
    </>
  );
};

export default Community;
