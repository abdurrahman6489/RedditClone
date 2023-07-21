import React from "react";

import Comment from "./Comment";
import "./PostComment.css";

const PostComment = ({ commentList }) => {
  const sortedComments = commentList
    .slice()
    .sort((comment1, comment2) => comment2.date.localeCompare(comment1.date));

  return (
    <>
      {sortedComments?.map((item) => (
        <Comment {...item} key={item.date} />
      ))}
    </>
  );
};
export default PostComment;

// {index > 0 && <Divider variant="inset" component="li" />}
