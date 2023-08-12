import React from "react";
import { Box } from "@mui/material";
import ThumbUpOffAltSharpIcon from "@mui/icons-material/ThumbUpOffAltSharp";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownAltSharpIcon from "@mui/icons-material/ThumbDownAltSharp";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

import { BsArrowUpCircleFill } from "react-icons/bs";
import { BsArrowUpCircle } from "react-icons/bs";
import { BsArrowDownCircleFill } from "react-icons/bs";
import { BsArrowDownCircle } from "react-icons/bs";

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
            icon={<BsArrowUpCircle size={30} />}
            checkedIcon={<BsArrowUpCircleFill size={30} />}
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
            icon={<BsArrowDownCircle size={30} />}
            checkedIcon={<BsArrowDownCircleFill size={30} />}
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
