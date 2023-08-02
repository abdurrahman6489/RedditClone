import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton } from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CancelIcon from "@mui/icons-material/Cancel";
import FormControl from "@mui/material/FormControl";
import Stack from "@mui/material/Stack";
import { editComment } from "../../action";
import { FORM_CONTAINER_STYLE } from "../../containers/SinglePost";
import { useDispatch } from "react-redux";
const EditInput = ({ changedText, id, date }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState(changedText);
  return (
    <FormControl sx={FORM_CONTAINER_STYLE}>
      <TextField
        type="text"
        id="outlined-required"
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
        <IconButton
          aria-label="done"
          color="success"
          onClick={() => dispatch(editComment(comment, id, date))}
        >
          <DoneIcon />
        </IconButton>
        <IconButton
          aria-label="cancel"
          color="error"
          onClick={() => dispatch(editComment(changedText, id, date))}
        >
          <CancelIcon />
        </IconButton>
      </Stack>
    </FormControl>
  );
};

export default EditInput;
