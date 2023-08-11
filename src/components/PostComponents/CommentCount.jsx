import React from "react";
import CommentIcon from "@mui/icons-material/Comment";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { useSelector, useDispatch } from "react-redux";
const CommentCount = ({ id }) => {
  const comments = useSelector((state) => state.comments);
  const currentPostComments = comments[id];
  let totalComments = currentPostComments
    ? `${currentPostComments.length} comments`
    : "0 comments";
  let color = currentPostComments ? "success" : "info";
  return (
    <IconButton
      size="small"
      aria-label="Comment-count"
      variant="outlined"
      color={color}
    >
      <Typography variant="caption">{totalComments}</Typography>
    </IconButton>
  );
};

export default CommentCount;
