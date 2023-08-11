import React from "react";
import { Link } from "react-router-dom";
import { routepath } from "../../Utils/routepaths";
import { deepOrange } from "@mui/material/colors";
import Avatar from "@mui/material/Avatar";
import RedditIcon from "@mui/icons-material/Reddit";
import Typography from "@mui/material/Typography";
const RedditLogo = () => {
  return (
    <>
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
          display: { xs: "none", sm: "none", md: "flex", lg: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        reddit
      </Typography>
    </>
  );
};

export default RedditLogo;
