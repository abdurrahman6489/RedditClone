import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RedoIcon from "@mui/icons-material/Redo";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import "./post.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setMsg, getSelectedPost, openLoginModal } from "../../action";

import { routepath } from "../../Utils/routepaths";
import { signalProps } from "../../Utils/utils";
import CommentCount from "./CommentCount";
import UserAvatar from "./UserAvator";
import Username from "./Username";
import DateComponent from "./DateComponent";
import UpvoteDownvote from "./UpvoteDownvote";
import FeatureComingSoon from "../FeatureComingSoon";

const SUCCESS_PATH = routepath.singlepost;
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
  const [open, setOpen] = useState(false);
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
    if (
      event.target.name == "Upvote" ||
      event.target.name == "share" ||
      event.target.name == "save" ||
      event.target.name == "Downvote"
    )
      return;
    if (!isLoggedIn) {
      dispatch(setMsg("You are not logged in, please login first", warning));
      dispatch(openLoginModal());
      return;
    }
    dispatch(getSelectedPost(id));
    navigate(`${SUCCESS_PATH}/${id}`);
  };
  const handleShare = (event) => {
    event.stopPropagation();
    setOpen(true);
  };
  return (
    <>
      <Card className="card" onClick={handleClick} sx={{ mb: 3 }}>
        <CardHeader
          avatar={<UserAvatar username={username} userAvatar={userAvatar} />}
          title={<Username variant="body1" username={username} />}
          subheader={<DateComponent date={time} />}
          sx={{ textAlign: "left" }}
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
          <IconButton
            name="share"
            onClick={handleShare}
            sx={{
              display: { xs: "none", sm: "none", md: "inline", lg: "inline" },
            }}
          >
            <RedoIcon />
            <Typography variant="body2" ml={2} sx={{ display: "inline" }}>
              Share
            </Typography>
          </IconButton>
          <IconButton
            name="save"
            onClick={handleShare}
            sx={{
              display: { xs: "none", sm: "none", md: "inline", lg: "inline" },
            }}
          >
            <TurnedInNotIcon />
            <Typography variant="body2" ml={2} sx={{ display: "inline" }}>
              Save
            </Typography>
          </IconButton>
        </CardActions>
      </Card>
      <FeatureComingSoon open={open} setOpen={setOpen} />
    </>
  );
};

export default Post;
