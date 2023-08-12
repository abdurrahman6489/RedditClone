import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  changeDownvote,
  changeUpvote,
  addComment,
  getAllComments,
  getSelectedPost,
} from "../action";
import { useNavigate, useParams } from "react-router-dom";
import { routepath } from "../Utils/routepaths";
import PostComment from "../components/PostComment/PostComment";
import Comment from "../components/PostComment/Comment";
import Post from "../components/PostComponents/Post";
import AddComment from "../components/PostComment/AddComment";
import RouteButton from "../components/RouteButton";
import {
  Typography,
  Container,
  Grid,
  FormControl,
  TextField,
  Button,
  Box,
  Divider,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ThumbUpOffAltSharpIcon from "@mui/icons-material/ThumbUpOffAltSharp";
import ThumbDownAltSharpIcon from "@mui/icons-material/ThumbDownAltSharp";
import Tooltip from "@mui/material/Tooltip";

export const FORM_CONTAINER_STYLE = {
  maxWidth: "99%",
  width: "95%",
  // border: "1px solid black",
};

const SinglePost = () => {
  const selectedPost = useSelector((state) => state.selectedPost);
  // console.log(selectedPost);
  // const posts = useSelector((state) => state.posts);
  const comments = useSelector((state) => state.comments);
  const dispatch = useDispatch();

  let params = useParams();

  let postId = params.id;
  console.log(postId);

  useEffect(() => {
    dispatch(getSelectedPost(parseInt(postId)));
    // dispatch(getAllComments(comments));
  }, []);

  const {
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
  } = selectedPost;
  const allComments = comments[id] || [];

  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: "1em",
        mt: "10vh",
        textAlign: "center",
      }}
    >
      <Box
        flex={2}
        sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
      >
        <RouteButton />
      </Box>
      <Box flex={6}>
        <Box
          sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" } }}
        >
          <RouteButton />
        </Box>
        <Post {...selectedPost} />
        <AddComment id={id} />
        <Divider sx={{ mt: "2vh", mb: "2vh" }} />
        <PostComment commentList={allComments} />
      </Box>
      <Box
        flex={2}
        sx={{ display: { xs: "none", sm: "none", md: "block", lg: "block" } }}
      ></Box>
    </Stack>
  );
};

export default SinglePost;
