import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltSharpIcon from "@mui/icons-material/ThumbUpOffAltSharp";
import ThumbDownAltSharpIcon from "@mui/icons-material/ThumbDownAltSharp";
import Chip from "@mui/material/Chip";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  changeDownvote,
  changeUpvote,
  setMsg,
  getSelectedPost,
} from "../action";
import { routepath } from "../routepaths";
import { signalProps } from "../utils";

const SUCCESS_PATH = routepath.singlepost;
const LOGIN_PATH = routepath.login;
const { warning } = signalProps;

const Post = ({
  title,
  id,
  description,
  url,
  upvote,
  downvote,
  username,
  upvoteStatus,
  downvoteStatus,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const selectedPost = useSelector((state) => state.selectedPost);

  const upvoted = upvoteStatus;
  const downvoted = downvoteStatus;
  const BTN_STYLE_upvote = upvoted ? "filled" : "outlined";
  const BTN_STYLE_downvote = downvoted ? "filled" : "outlined";

  // console.log("from Post file ", upvote);

  const handleVote = (event) => {
    // event.stopPropagation();
    event.stopImmediatePropagation();
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

  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(setMsg("You are not logged in, please login first", warning));
      navigate(LOGIN_PATH);
      return;
    }
    dispatch(getSelectedPost(id));
    navigate(`${SUCCESS_PATH}/${id}`);
  };
  return (
    <>
      <Card
        sx={{
          maxWidth: 400,
          width: 350,
          objectFit: "cover",
          aspectRatio: 1 / 1.5,
          position: "relative",
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <CardMedia sx={{ height: 220 }} image={url} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
          >
            {description}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mt: 2 }}>
            posted by : {username}
          </Typography>
        </CardContent>
        <CardActions sx={{ position: "absolute", bottom: 4 }}>
          <Chip
            icon={<ThumbUpOffAltSharpIcon />}
            variant={BTN_STYLE_upvote}
            color="success"
            name="Upvote"
            label={`Upvote ${upvote}`}
            sx={{ padding: "0.5em" }}
            component="button"
            onClick={(event) => {
              console.log(event);
              handleVote("Upvote");
            }}
          />
          <Chip
            variant={BTN_STYLE_downvote}
            color="error"
            name="Downvote"
            label={`Downvote ${downvote}`}
            sx={{ padding: "0.5em" }}
            onClick={() => handleVote("Downvote")}
            icon={<ThumbDownAltSharpIcon />}
          />
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
