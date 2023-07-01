import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeDownvote, changeUpvote } from "../action";
import { useNavigate, useParams } from "react-router-dom";
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
import ShareIcon from "@mui/icons-material/Share";
const FORM_CONTAINER_STYLE = {
  maxWidth: "95%",
  width: "90%",
  aspectRatio: "1/1.5",
  mt: "3vh",
  padding: "1em",
};

const SinglePost = () => {
  const posts = useSelector((state) => state.posts);
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  const [postData, setPostData] = useState({});
  const [comment, setComment] = useState("");

  useEffect(() => {
    let id = params.id;
    let selectedId = Number(id.substring(1));
    console.log(typeof selectedId, selectedId);
    const index = posts.findIndex((post) => post.id == selectedId);
    console.log(index);
    console.log(posts[index]);
    setPostData((obj) => posts[index]);
  }, [params.id]);

  const { title, description, url, upvote, downvote, voteStatus, id } =
    postData;
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
      return;
    }
    dispatch(changeDownvote({ id, downvote }));
  };

  if (!title) return <div>No data found</div>;
  return (
    <Container maxWidth="sm" sx={{ mt: "10vh", textAlign: "center" }}>
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
            />
            <Chip
              icon={<ArrowDownward />}
              label={`Downvote ${downvote}`}
              color="error"
              variant={BTN_STYLE}
              onClick={() => handleVote("Downvote")}
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
