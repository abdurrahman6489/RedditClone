import React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { Box, Divider, Stack } from "@mui/material";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import EditInput from "./EditInput";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment, openToEdit } from "../../action";
import { findDays } from "../../Utils/utils";
// const Img = styled("img")({
//   margin: "auto",
//   display: "block",
//   maxWidth: "100%",
//   maxHeight: "100%",
// });

const Comment = ({ user, comment, date, color, id, isEdit, changedText }) => {
  const usernameFirstLetter = user.split("")[0].toUpperCase();
  const currentUsername = useSelector((state) => state.currentUser.firstName);
  const dateString = findDays(date);
  const dispatch = useDispatch();
  return (
    <>
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          flexGrow: 1,
          mt: "1vh",
          mb: "1vh",
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box flex={1}>
            <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
              {usernameFirstLetter}
            </Avatar>
          </Box>
          <Box flex={4} sx={{ textAlign: "left" }}>
            <Typography variant="body2" gutterBottom>
              {user} {user == currentUsername && " (you)"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {dateString}
            </Typography>
            {user == currentUsername && !isEdit && (
              <Typography gutterBottom variant="subtitle1" component="div">
                {comment}
              </Typography>
            )}
            {user == currentUsername && isEdit && (
              <EditInput changedText={changedText} id={id} date={date} />
            )}
          </Box>
          <Box flex={1}>
            {user == currentUsername && !isEdit && (
              <Stack direction="row" spacing={2}>
                <IconButton
                  aria-label="edit"
                  color="info"
                  onClick={() => dispatch(openToEdit(id, date))}
                >
                  <EditIcon />
                </IconButton>

                <IconButton
                  aria-label="delete"
                  color="error"
                  onClick={() => dispatch(deleteComment(id, date))}
                >
                  <DeleteOutlineIcon />
                </IconButton>
              </Stack>
            )}
          </Box>
        </Stack>
      </Paper>
    </>
  );
};
export default Comment;
