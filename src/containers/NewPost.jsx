import React, { useState, useEffect } from "react";
import {
  Typography,
  Stack,
  Box,
  styled,
  TextField,
  FormControl,
  Tooltip,
} from "@mui/material";
import { IconButton } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AddIcon from "@mui/icons-material/Add";

import { useSelector, useDispatch } from "react-redux";
import UserAvatar from "../components/PostComponents/UserAvator";
import Username from "../components/PostComponents/Username";
import RouteButton from "../components/RouteButton";
import { addPost, setMsg } from "../action";
import { useNavigate } from "react-router-dom";
import { routepath } from "../Utils/routepaths";
import { signalProps } from "../Utils/utils";

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "1em",
  marginBottom: "0.5em",
});

const SUCCESS_NAVIGATE_PAGE = routepath.home;
const LOGIN_PATH = routepath.login;
const { success, warning } = signalProps;

const NewPost = () => {
  const currentUser = useSelector((state) => state.currentUser);
  const firstName = currentUser.firstName;
  const photoURL = currentUser.photoURL;
  const [post, setPost] = useState({ title: "", description: "", url: "" });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser.username) {
      dispatch(setMsg("You are logged out", warning));
      navigate(SUCCESS_NAVIGATE_PAGE);
      return;
    }
  }, [currentUser.username]);

  const handleChange = (event) => {
    setPost((oldPost) => ({
      ...oldPost,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, url } = post;
    if (Object.keys(post).some((key) => post[key].length == 0)) return;
    dispatch(setMsg("Post added successfully", success));
    dispatch(addPost({ title, description, url }));
    navigate(SUCCESS_NAVIGATE_PAGE);
    setPost({ title: "", description: "", url: "" });
  };

  const handleFileSelect = (event) => {
    console.log(event);
    let file = event.target.files[0];
    // let value = URL.createObjectURL(event.target.files[0]);
    // setPost((oldPost) => ({ ...oldPost, url: value }));
    //URL.createObjectURL was not working properly
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      console.log(reader.result);
      setPost((oldPost) => ({ ...oldPost, url: reader.result }));
    };
    reader.onerror = function (error) {
      console.log("error ", error);
    };
  };
  return (
    <>
      <Stack direction="row" justifyContent="space-between" sx={{ ml: "1em" }}>
        <Box flex={4} sx={{ mt: 10 }} p={3}>
          <RouteButton path={routepath.home} pathName="Home" left={0} top={0} />
          <Typography variant="h6" color="gray" textAlign="center">
            Create Post
          </Typography>
          <UserBox>
            <UserAvatar username={firstName} userAvatar={photoURL} />
            <Username username={firstName} variant="h5" />
          </UserBox>
          <TextField
            type="text"
            id="outlined-required"
            value={post.title}
            name="title"
            color="primary"
            fullWidth
            onChange={handleChange}
            placeholder="Title..."
            sx={{
              width: { lg: "70%", md: "80%", sm: "100%", xs: "100%" },
              borderRadius: "2em",
              mt: 3,
              mb: 3,
              border: "none",
              display: "block",
            }}
          />
          <TextField
            value={post.description}
            name="description"
            id="outlined-multiline-static"
            multiline
            fullWidth
            rows={8}
            color="primary"
            placeholder="What's on your mind..."
            sx={{
              width: { lg: "70%", md: "80%", sm: "100%", xs: "100%" },
              borderRadius: "2em",
              mb: 5,
              display: "block",
            }}
            onChange={handleChange}
          />
          <FormControl>
            <Stack direction="row">
              <Tooltip title="Add Photo">
                <label for="file">
                  <AddPhotoAlternateIcon fontSize="large" />
                </label>
              </Tooltip>

              <input
                type="file"
                id="file"
                accept="image/*"
                onChange={handleFileSelect}
                style={{ display: "none" }}
              />
              <IconButton
                size="small"
                aria-label="Create Post"
                variant="outlined"
                color="primary"
                onClick={handleSubmit}
                sx={{ width: "100%" }}
              >
                <AddIcon />
                <Typography variant="button">Create Post</Typography>
              </IconButton>
            </Stack>
          </FormControl>
        </Box>
      </Stack>
    </>
  );
};

export default NewPost;
