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

import AllInboxIcon from "@mui/icons-material/AllInbox";
import HomeIcon from "@mui/icons-material/Home";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { useSelector, useDispatch } from "react-redux";
import { filterPost } from "../action";
import CustomTheme from "./CustomTheme";

const PRIMARY_COLOR = "hsl(206, 100%, 41%)";
const SECONDARY_COLOR = "#333";

const FeedFilter = () => {
  const [selected, setSelected] = useState(-1);
  const filtersArray = useSelector((state) => state.filtersArray);
  const HomeStatus = filtersArray.find(
    (filter) => filter.label == "Home"
  ).status;
  const PopularStatus = filtersArray.find(
    (filter) => filter.label == "Popular"
  ).status;
  const AllStatus = filtersArray.find((filter) => filter.label == "All").status;
  const dispatch = useDispatch();

  const handleFilterPost = (label) => {
    dispatch(filterPost(label));
  };

  return (
    <CustomTheme primaryColor={PRIMARY_COLOR} secondaryColor={SECONDARY_COLOR}>
      <List
        subheader={
          <Typography variant="body2" color="gray">
            Feeds
          </Typography>
        }
      >
        <ListItem disablePadding>
          <ListItemButton
            selected={HomeStatus}
            color={HomeStatus ? "primary" : "secondary"}
            onClick={(event) => {
              setSelected(1);
              handleFilterPost("Home");
            }}
          >
            <ListItemIcon>
              <HomeIcon color={HomeStatus ? "primary" : "secondary"} />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              sx={{
                color: HomeStatus ? PRIMARY_COLOR : SECONDARY_COLOR,
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={PopularStatus}
            color={PopularStatus ? "primary" : "secondary"}
            onClick={(event) => {
              setSelected(2);
              handleFilterPost("Popular");
            }}
          >
            <ListItemIcon>
              <ArrowOutwardIcon
                color={PopularStatus ? "primary" : "secondary"}
              />
            </ListItemIcon>
            <ListItemText
              primary="Popular"
              sx={{
                color: PopularStatus ? PRIMARY_COLOR : SECONDARY_COLOR,
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton
            selected={AllStatus}
            color={AllStatus ? "primary" : "secondary"}
            onClick={(event) => {
              setSelected(3);
              handleFilterPost("All");
            }}
          >
            <ListItemIcon>
              <AllInboxIcon color={AllStatus ? "primary" : "secondary"} />
            </ListItemIcon>
            <ListItemText
              primary="All"
              sx={{
                color: AllStatus ? PRIMARY_COLOR : SECONDARY_COLOR,
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
    </CustomTheme>
  );
};

export default FeedFilter;
