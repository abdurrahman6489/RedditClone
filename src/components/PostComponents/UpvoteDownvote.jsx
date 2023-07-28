import React from "react";
import { Button } from "@mui/material";
import ThumbUpOffAltSharpIcon from "@mui/icons-material/ThumbUpOffAltSharp";
import ThumbDownAltSharpIcon from "@mui/icons-material/ThumbDownAltSharp";

import { useSelector, useDispatch } from "react-redux";
import { routepath } from "../../routepaths";
import { signalProps } from "../../utils";

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
  const BTN_STYLE_upvote = upvoted ? "contained" : "outlined";
  const BTN_STYLE_downvote = downvoted ? "contained" : "outlined";

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
    <>
      <Button
        startIcon={<ThumbUpOffAltSharpIcon />}
        variant={BTN_STYLE_upvote}
        color="success"
        name="Upvote"
        sx={{ padding: "0.7em", borderRadius: "1em" }}
        size="small"
        onClick={handleVote}
      >
        {upvote}
      </Button>
      <Button
        endIcon={<ThumbDownAltSharpIcon />}
        variant={BTN_STYLE_downvote}
        color="error"
        name="Downvote"
        sx={{ padding: "0.7em", borderRadius: "1em" }}
        size="small"
        onClick={handleVote}
      >
        {downvote}
      </Button>
    </>
  );
};

export default UpvoteDownvote;
