import React from "react";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { filterPost } from "../action";
import { useDispatch } from "react-redux";
import CustomTheme from "../components/CustomTheme";

const PRIMARY_COLOR = "hsl(237, 26%, 89%)";
const SECONDARY_COLOR = "hsl(237, 26%, 69%)";

const Filter = ({ label, color, status, index }) => {
  const dispatch = useDispatch();

  const getColour = (status) => {
    return status ? "primary" : "secondary";
  };

  return (
    <CustomTheme primaryColor={PRIMARY_COLOR} secondaryColor={SECONDARY_COLOR}>
      <IconButton
        size="large"
        aria-label="Create-Post"
        color={getColour(status)}
        variant="filled"
        onClick={() => dispatch(filterPost(label, index))}
      >
        <Typography variant="button">{label}</Typography>
      </IconButton>
    </CustomTheme>
  );
};

export default Filter;
