import React, { useState, useEffect, useLayoutEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDownvote, changeUpvote } from "../action";
import { useNavigate, useParams } from "react-router-dom";
import { routepath } from "../routepaths";
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

const FORM_CONTAINER_STYLE = {
  maxWidth: "95%",
  width: "90%",
  aspectRatio: "1/0.3",
  mt: "3vh",
  padding: "1em",
};

const Single_Post_Path = routepath.singlepost;

const SinglePost = () => {
  const selectedPost = useSelector((state) => state.selectedPost);
  const [comment, setComment] = useState("");
  // const [currentPost, setCurrentPost] = useState(selectedPost);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const { title, description, url, upvote, downvote, voteStatus, id } =
    selectedPost;
  console.log(title, upvote);
  const voted = voteStatus;
  const BTN_STYLE = voted ? "filled" : "outlined";

  const handleVote = (name) => {
    if (!isLoggedIn) {
      navigate(LOGIN_PATH);
      return;
    }
    console.log(name);
    if (name == "Upvote") {
      dispatch(changeUpvote({ id, upvote }));
    } else {
      dispatch(changeDownvote({ id, downvote }));
    }
    // navigate(`${Single_Post_Path}/${id}`);
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
              sx={{ mt: "2vh" }}
              onClick={(event) => setComment(event.target.value)}
            />

            <Button variant="contained" color="success" sx={{ mt: "2vh" }}>
              comment
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SinglePost;
