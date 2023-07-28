import React from "react";
import CommentIcon from "@mui/icons-material/Comment";
import Chip from "@mui/material/Chip";
import {useSelector, useDispatch} from "react-redux"
const CommentCount = ({ id }) => {
  const comments = useSelector(state => state.comments);
  const currentPostComments = comments[id];
  let totalComments = currentPostComments ? `${currentPostComments.length} comments` : "0 comments";
  let color = currentPostComments ? "success" : "info"
  return (
    <Chip
      icon={<CommentIcon />}
      label={totalComments}
      sx={{ ml: "2rem" }}
      variant="outlined"
      color={color}
    />
  );
};

export default CommentCount;
