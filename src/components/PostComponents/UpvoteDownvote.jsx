import React from "react";
import { Box } from "@mui/material";
import ThumbUpOffAltSharpIcon from "@mui/icons-material/ThumbUpOffAltSharp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltSharpIcon from "@mui/icons-material/ThumbDownAltSharp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Checkbox from "@mui/material/Checkbox";
import { FormControlLabel } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { routepath } from "../../Utils/routepaths";
import { signalProps } from "../../Utils/utils";

import { changeDownvote, changeUpvote, setMsg } from "../../action";

import { useNavigate } from "react-router-dom";

const LOGIN_PATH = routepath.login;
const { warning } = signalProps;

const UpvoteDownvote = ({
  id,
  upvoteStatus,
  downvoteStatus,
  upvote,
  downvote,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const upvoted = upvoteStatus;
  const downvoted = downvoteStatus;

  const handleVote = (event) => {
    event.stopPropagation();

    if (!isLoggedIn) {
      dispatch(setMsg("You are not logged in, please login first", warning));
      navigate(LOGIN_PATH);
      return;
    }

    let name = event.target.name;
    console.log(name);
    if (name == "Upvote") {
      dispatch(changeUpvote({ id, upvote }));
      return;
    }
    dispatch(changeDownvote({ id, downvote }));
  };

  return (
    <Box sx={{ ml: 2 }}>
      <FormControlLabel
        label={upvote}
        control={
          <Checkbox
            icon={<ThumbUpOffAltIcon />}
            checkedIcon={<ThumbUpOffAltSharpIcon />}
            name="Upvote"
            fontSize="small"
            checked={upvoted}
            onChange={handleVote}
          />
        }
      />
      <FormControlLabel
        label={downvote}
        control={
          <Checkbox
            icon={<ThumbDownOffAltIcon />}
            checkedIcon={<ThumbDownAltSharpIcon />}
            name="Downvote"
            fontSize="small"
            checked={downvoted}
            onChange={handleVote}
          />
        }
      />
    </Box>
  );
};

export default UpvoteDownvote;
