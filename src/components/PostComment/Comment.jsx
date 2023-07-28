import React from "react";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import { deleteComment } from "../../action";
import { findDays } from "../../utils";
// const Img = styled("img")({
//   margin: "auto",
//   display: "block",
//   maxWidth: "100%",
//   maxHeight: "100%",
// });

const Comment = ({ user, comment, date, color, id }) => {
  const usernameFirstLetter = user.split("")[0].toUpperCase();
  const currentUsername = useSelector((state) => state.currentUser.firstName);
  const dateString = findDays(date);
  const dispatch = useDispatch();
  return (
    <>
      {/* {index > 0 && <Divider variant="inset" component="li" />} */}
      <Paper
        sx={{
          p: 2,
          margin: "auto",
          flexGrow: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1A2027" : "#fff",
        }}
      >
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase sx={{ width: 128, height: 128 }}>
              <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>
                {usernameFirstLetter}
              </Avatar>
            </ButtonBase>
          </Grid>
          <Grid textAlign={"left"} item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography variant="body2" gutterBottom>
                  {user} {user == currentUsername && " (you)"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {dateString}
                </Typography>
                <Typography gutterBottom variant="subtitle1" component="div">
                  {comment}
                </Typography>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item>
              {user == currentUsername && (
                <Stack direction="row" spacing={2}>
                  <IconButton aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    onClick={() => dispatch(deleteComment(id, date))}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </Stack>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};
export default Comment;
