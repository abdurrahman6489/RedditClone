import React from "react";
import IconButton from "@mui/material/IconButton";
import { Fab } from "@mui/material";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import RocketIcon from "@mui/icons-material/Rocket";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Brightness5SharpIcon from "@mui/icons-material/Brightness5Sharp";
import IosShareTwoToneIcon from "@mui/icons-material/IosShareTwoTone";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import HomeIcon from "@mui/icons-material/Home";
import ArrowOutwardIcon from "@mui/icons-material/ArrowOutward";

import { filterPost } from "../action";
import { useDispatch } from "react-redux";
import CustomTheme from "../components/CustomTheme";

const PRIMARY_COLOR = "hsl(206, 100%, 41%)";
const SECONDARY_COLOR = "hsl(0, 0%, 90%)";

const Filter = ({ label, color, status, index }) => {
  const dispatch = useDispatch();

  const getColour = (status) => {
    return status ? "primary" : "secondary";
  };

  return (
    <CustomTheme primaryColor={PRIMARY_COLOR} secondaryColor={SECONDARY_COLOR}>
      <Fab
        size="small"
        aria-label="Filter"
        color={getColour(status)}
        variant="extended"
        onClick={() => dispatch(filterPost(label, index))}
      >
        {label == "Best" && <RocketIcon />}
        {label == "Hot" && <LocalFireDepartmentIcon />}
        {label == "New" && <Brightness5SharpIcon />}
        {label == "Top" && <IosShareTwoToneIcon />}
        {label == "All" && <AllInboxIcon />}
        {label == "Home" && <HomeIcon />}
        {label == "Popular" && <ArrowOutwardIcon />}
        <Typography variant="button">{label}</Typography>
      </Fab>
    </CustomTheme>
  );
};

export default Filter;
