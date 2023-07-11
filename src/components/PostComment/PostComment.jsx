import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

import { useSelector } from "react-redux";
import "./PostComment.css";

const PostComment = ({ commentList }) => {
  const currentUsername = useSelector((state) => state.currentUser.firstName);
  const sortedComments = commentList
    .slice()
    .sort((comment1, comment2) => comment2.date.localeCompare(comment1.date));

  const color = () => `hsl(${Math.floor(Math.random() * 100)}, 80%, 50%)`;
  return (
    <List
      sx={{
        maxWidth: "100%",
        width: "90%",
        bgcolor: "background.paper",
        aspectRatio: "4/1",
        overflow: "auto",
        textAlign: "center",
        // border: "1px solid black",
        ml: "2vw",
        mb: "2vh",
      }}
      className="list"
    >
      {sortedComments?.map((item, index) => {
        const { user, comment, date } = item;
        const usernameFirstLetter = user.split("")[0].toUpperCase();
        const currentColor = color();
        return (
          <>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: currentColor }}>
                  {usernameFirstLetter}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={comment}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {user}
                    </Typography>
                    {user == currentUsername && " (you)"} {date}
                    <Chip
                      icon={<DeleteOutlineIcon />}
                      variant="outlined"
                      color="info"
                      sx={{ mt: "2vh" }}
                    />
                  </React.Fragment>
                }
              />
            </ListItem>
          </>
        );
      })}
    </List>
  );
};
export default PostComment;
