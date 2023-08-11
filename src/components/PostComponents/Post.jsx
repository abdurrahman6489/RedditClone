import React, { useState } from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

import "./post.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setMsg, getSelectedPost } from "../../action";

import { routepath } from "../../Utils/routepaths";
import { signalProps } from "../../Utils/utils";
import CommentCount from "./CommentCount";
import DateComponent from "./DateComponent";
import UserAvator from "./UserAvator";
import UpvoteDownvote from "./UpvoteDownvote";

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
  const upvoteDownvoteObj = {
    id,
    upvote,
    downvote,
    upvoteStatus,
    downvoteStatus,
  };
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

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
      <Card className="card" onClick={handleClick}>
        <CardMedia className="img" image={url} title={title} />
        <CardContent>
          <Typography
            gutterBottom
            variant="h6"
            component="div"
            className="title"
          >
            {title.length <= 60 ? title : `${title.slice(0, 60)}...`}
          </Typography>
          <Typography variant="body2" className="description">
            {description.length <= 60
              ? description
              : `${description.slice(0, 60)}...`}
          </Typography>
          <UserAvator userAvatar={userAvatar} username={username} />
          <DateComponent date={time} />
        </CardContent>
        <CardActions>
          <UpvoteDownvote {...upvoteDownvoteObj} />
          <CommentCount id={id} />
        </CardActions>
      </Card>
    </>
  );
};

export default Post;
