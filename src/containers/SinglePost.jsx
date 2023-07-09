import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDownvote, changeUpvote, addComment } from "../action";
import { useNavigate, useParams } from "react-router-dom";
import { routepath } from "../routepaths";
import PostComment from "../components/PostComment/PostComment";
import {
  Typography,
  Container,
  Grid,
  FormControl,
  TextField,
  Button,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { ArrowDownward } from "@mui/icons-material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ShareIcon from "@mui/icons-material/Share";
import CommentIcon from "@mui/icons-material/Comment";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

const FORM_CONTAINER_STYLE = {
  maxWidth: "95%",
  width: "90%",
  aspectRatio: "4/1",
  mt: "3vh",
  // border: "1px solid black",
};

const SinglePost = () => {
  const selectedPost = useSelector((state) => state.selectedPost);
  const comments = useSelector((state) => state.comments);
  const [comment, setComment] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const { title, description, url, upvote, downvote, voteStatus, id } =
    selectedPost;
  const allComments = comments[id] || [];
  // console.log(allComments);
  // console.log(title, upvote);
  const voted = voteStatus;
  const BTN_STYLE = voted ? "filled" : "outlined";

  const handleVote = (name) => {
    if (!isLoggedIn) {
      navigate(LOGIN_PATH);
      return;
    }
    // console.log(name);
    if (name == "Upvote") {
      dispatch(changeUpvote({ id, upvote }));
    } else {
      dispatch(changeDownvote({ id, downvote }));
    }
  };

  const clearComment = () => {
    if (comment.length > 0) setComment("");
  };

  const handleComment = () => {
    console.log("in the handle comment function line no 68");
    if (comment.length == 0) return;
    dispatch(addComment(comment, id));
    setComment("");
  };
  if (!title) return <div>No data found</div>;
  return (
    <Container maxWidth="sm" sx={{ mt: "10vh", textAlign: "center" }}>
      <Chip
        icon={<ArrowLeftIcon />}
        label="Home"
        color="success"
        variant="outlined"
        onClick={() => navigate(routepath.home)}
      />
      <Typography variant="h5" sx={{ color: "#AA4A44" }}>
        {title}
      </Typography>
      <Grid
        justifyContent="center"
        alignItems="center"
        container
        sx={{ maxHeight: "60vh" }}
      >
        <Grid item>
          <img
            src={url}
            alt={title}
            style={{ maxWidth: "70%", width: "65%", aspectRatio: "1/1" }}
          />
          <Typography variant="body1" sx={{ mt: "2vh" }}>
            {description}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ ml: "2vw", mt: "5vh" }}>
            <Chip
              icon={<ArrowUpwardIcon />}
              label={`Upvote ${upvote}`}
              color="success"
              variant={BTN_STYLE}
              onClick={() => handleVote("Upvote")}
              key={"upvote"}
            />
            <Chip
              icon={<ArrowDownward />}
              label={`Downvote ${downvote}`}
              color="error"
              variant={BTN_STYLE}
              onClick={() => handleVote("Downvote")}
              key={"downvote"}
            />
            <Chip icon={<ShareIcon />} label="Share" color="info" />
          </Stack>

          <FormControl sx={FORM_CONTAINER_STYLE}>
            <TextField
              type="text"
              id="outlined-required"
              label="comment"
              value={comment}
              color="success"
              onChange={(event) => setComment(event.target.value)}
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ ml: "2vw", mt: "2vh" }}
              alignItems={"center"}
              justifyContent={"flex-end"}
            >
              <Chip
                icon={<CommentIcon />}
                variant="outlined"
                color="success"
                label="comment"
                onClick={handleComment}
              />
              <Chip
                icon={<DeleteOutlineIcon />}
                variant="outlined"
                color="info"
                label="Delete"
                sx={{ mt: "2vh" }}
                onClick={clearComment}
              />
            </Stack>
          </FormControl>
          <PostComment commentList={allComments} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SinglePost;
