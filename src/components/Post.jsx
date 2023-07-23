import React, { useState } from "react";
import { Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import ThumbUpOffAltSharpIcon from "@mui/icons-material/ThumbUpOffAltSharp";
import ThumbDownAltSharpIcon from "@mui/icons-material/ThumbDownAltSharp";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";

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
import CommentCount from "./CommentCount";

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
  userAvatar,
  time,
}) => {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const currentUser = useSelector((state) => state.currentUser);
  let userChipLabel =
    username == currentUser.username ? `${username} (you)` : username;
  const userNameFirstLetter = username.split("")[0].toUpperCase();

  const upvoted = upvoteStatus;
  const downvoted = downvoteStatus;
  const BTN_STYLE_upvote = upvoted ? "contained" : "outlined";
  const BTN_STYLE_downvote = downvoted ? "contained" : "outlined";

  // console.log("from Post file ", upvote);

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
          cursor: "pointer",
        }}
        onClick={handleClick}
      >
        <CardMedia sx={{ height: 220 }} image={url} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title.length <= 60 ? title : `${title.slice(0, 60)}...`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description.length <= 60
              ? description
              : `${description.slice(0, 60)}...`}
          </Typography>
          <Chip
            avatar={
              userAvatar ? (
                <Avatar alt={username} src={userAvatar} />
              ) : (
                <Avatar>{userNameFirstLetter}</Avatar>
              )
            }
            label={userChipLabel}
            variant="outlined"
            size="medium"
            sx={{ mt: 2 }}
          />
          <Typography variant="body2" sx={{ mt: "2vh" }}>
            {time}
          </Typography>
        </CardContent>
        <CardActions>
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
          <CommentCount id={id} />
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
