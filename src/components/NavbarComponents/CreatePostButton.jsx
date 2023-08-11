import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { routepath } from "../../Utils/routepaths";
import { signalProps } from "../../Utils/utils";
import { setMsg } from "../../action";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import PostAddIcon from "@mui/icons-material/PostAdd";
const SUCCESS_PATH = routepath.createPost;
const LOGIN_PATH = routepath.login;
const { warning } = signalProps;

const CreatePostButton = ({ display }) => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    if (!isLoggedIn) {
      dispatch(setMsg("You are not logged in, please login first", warning));
      navigate(LOGIN_PATH);
      return;
    }
    navigate(SUCCESS_PATH);
  };
  return (
    <IconButton
      size="large"
      aria-label="Create-Post"
      color="inherit"
      sx={{
        color: { xs: "#333", sm: "#333", md: "#FFF", lg: "#FFF" },
        display: display,
      }}
      onClick={handleClick}
    >
      <Typography variant="body1" sx={{ display: "inline" }}>
        Create Post
      </Typography>
      <PostAddIcon />
    </IconButton>
  );
};

export default CreatePostButton;
