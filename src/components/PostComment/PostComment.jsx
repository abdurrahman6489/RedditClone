import React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import "./PostComment.css";
const PostComment = ({ commentList }) => {
  return (
    <List
      sx={{
        maxWidth: "100%",
        width: "90%",
        bgcolor: "background.paper",
        aspectRatio: "5/1",
        overflow: "auto",
        textAlign: "center",
        // border: "1px solid black",
        ml: "2vw",
        mb: "2vh",
      }}
      className="list"
    >
      {commentList?.map((item, index) => {
        const { user, comment } = item;
        const usernameFirstLetter = user.split("")[0].toUpperCase();
        return (
          <>
            {index > 0 && <Divider variant="inset" component="li" />}
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt="Remy Sharp">{usernameFirstLetter}</Avatar>
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
