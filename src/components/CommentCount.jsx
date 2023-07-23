import React from "react";
import CommentIcon from "@mui/icons-material/Comment";
import Chip from "@mui/material/Chip";
const CommentCount = ({ id }) => {
  let totalComments = `${id} comments`;
  return (
    <Chip
      icon={<CommentIcon />}
      label={totalComments}
      sx={{ ml: "2rem" }}
      variant="outlined"
      color="info"
    />
  );
};

export default CommentCount;
