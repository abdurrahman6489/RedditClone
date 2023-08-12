import {
  Box,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import CommentIcon from "@mui/icons-material/Comment";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import { addComment } from "../../action";
import { useDispatch } from "react-redux";
import { FORM_CONTAINER_STYLE } from "../../containers/SinglePost";

const AddComment = ({ id }) => {
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();

  const handleComment = (event) => {
    event.preventDefault();
    console.log("in the handle comment function line no 68");
    if (comment.length == 0) return;
    dispatch(addComment(comment, id));
    setComment("");
  };
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        display: "flex",
        alignItems: "center",
        height: "15vh",
      }}
    >
      <form style={FORM_CONTAINER_STYLE} onSubmit={handleComment}>
        <Stack
          direction="row"
          spacing={2}
          sx={{ ml: "2vw", mt: "2vh" }}
          alignItems={"center"}
          justifyContent={"flex-end"}
        >
          <TextField
            type="text"
            id="outlined-required"
            label="comment"
            value={comment}
            color="primary"
            fullWidth
            onChange={(event) => setComment(event.target.value)}
          />

          <Tooltip title="Add a Comment" placement="bottom">
            <IconButton
              aria-label="comment"
              color="info"
              onClick={handleComment}
            >
              <SendIcon />
            </IconButton>
          </Tooltip>
        </Stack>
      </form>
    </Box>
  );
};

export default AddComment;
