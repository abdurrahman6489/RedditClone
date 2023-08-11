import React from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import "./post.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setMsg, getSelectedPost } from "../../action";

import { routepath } from "../../Utils/routepaths";
import { signalProps } from "../../Utils/utils";
import CommentCount from "./CommentCount";
import UserAvatar from "./UserAvator";
import Username from "./Username";
import DateComponent from "./DateComponent";
import UpvoteDownvote from "./UpvoteDownvote";

const SUCCESS_PATH = routepath.singlepost;
const LOGIN_PATH = routepath.login;
const { warning } = signalProps;

const LargerPost = ({
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

  const handleClick = (event) => {
    if (event.target.name == "Upvote" || event.target.name == "Downvote")
      return;
    if (!isLoggedIn) {
      dispatch(setMsg("You are not logged in, please login first", warning));
      navigate(LOGIN_PATH);
      return;
    }
    dispatch(getSelectedPost(id));
    navigate(`${SUCCESS_PATH}/${id}`);
  };
  return (
    <Card className="card" onClick={handleClick} sx={{ mb: 3 }}>
      <CardHeader
        avatar={<UserAvatar username={username} userAvatar={userAvatar} />}
        title={<Username variant="body1" username={username} />}
        subheader={<DateComponent date={time} />}
      />
      <CardMedia component="img" height="20%" image={url} alt={title} />
      <CardContent>
        <Typography variant="h6" color="text.secondary" className="title">
          {title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          className="description"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <UpvoteDownvote {...upvoteDownvoteObj} />
        <CommentCount id={id} />
      </CardActions>
    </Card>
  );
};

export default LargerPost;
