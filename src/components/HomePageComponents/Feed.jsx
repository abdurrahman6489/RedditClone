import { Box } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LargerPost from "../PostComponents/LargerPost";
const Feed = () => {
  const filteredPosts = useSelector((state) => state.filteredPosts);
  return (
    <Box flex={3} sx={{ mt: 10 }}>
      {filteredPosts?.map((post) => (
        <LargerPost {...post} key={post.title} />
      ))}
    </Box>
  );
};

export default Feed;
