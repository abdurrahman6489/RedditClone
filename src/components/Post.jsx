import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ArrowDownward } from "@mui/icons-material";

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
  voteStatus,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const voted = voteStatus;
  const BTN_STYLE = voted ? "contained" : "outlined";

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
          <Button
            variant={BTN_STYLE}
            color="success"
            name="Upvote"
            onClick={handleVote}
            startIcon={<ArrowUpwardIcon />}
          >
            Upvote {upvote}
          </Button>
          <Button
            variant={BTN_STYLE}
            color="error"
            name="Downvote"
            onClick={handleVote}
            endIcon={<ArrowDownward />}
          >
            Downvote {downvote}
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
