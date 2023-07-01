import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, setMsg } from "../action";
import { useNavigate } from "react-router-dom";
import { routepath } from "../routepaths";
import {
  Container,
  Typography,
  Grid,
  Button,
  Divider,
  FormControl,
  TextField,
  TextareaAutosize,
} from "@mui/material";
const FORM_CONTAINER_STYLE = {
  maxWidth: "95%",
  width: "90%",
  aspectRatio: "1/1.5",
  padding: "1em",
};
const SUCCESS_NAVIGATE_PAGE = routepath.home;
const NewPost = () => {
  const [post, setPost] = useState({ title: "", description: "", url: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (event) => {
    setPost((oldPost) => ({
      ...oldPost,
      [event.target.name]: event.target.value,
    }));
  };
  const handleFileSelect = (event) => {
    let value = URL.createObjectURL(event.target.files[0]);
    setPost((oldPost) => ({ ...oldPost, url: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, url } = post;
    if (Object.keys(post).some((key) => post[key].length == 0)) return;
    dispatch(setMsg("Post added successfully"));
    dispatch(addPost({ title, description, url }));
    navigate(SUCCESS_NAVIGATE_PAGE);
    setPost({ title: "", description: "", url: "" });
  };

  return (
    <Container maxWidth="lg" sx={{ mt: "10vh", textAlign: "center" }}>
      <Grid
        justifyContent="center"
        alignItems="center"
        container
        sx={{ maxHeight: "100vh" }}
      >
        <Grid item>
          <FormControl sx={FORM_CONTAINER_STYLE}>
            <Typography variant="h4" sx={{ color: "#AA4A44" }}>
              Create Post
            </Typography>
            <TextField
              type="text"
              id="outlined-required"
              label="Post Title"
              value={post.title}
              name="title"
              color="success"
              fullWidth
              sx={{ mt: "2vh" }}
              onChange={handleChange}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              style={{ marginTop: "4vh", marginBottom: "4vh" }}
            />
            <TextareaAutosize
              id="outlined-required"
              label="Description"
              fullWidth
              value={post.description}
              name="description"
              color="success"
              minRows="15"
              sx={{ mt: "4vh" }}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="success"
              onClick={handleSubmit}
              sx={{ mt: "2vh" }}
            >
              Create Post
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Container>
  );
};

export default NewPost;
