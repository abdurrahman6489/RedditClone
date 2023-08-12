import { Box } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import LargerPost from "../PostComponents/LargerPost";
import FilterContainer from "../../filterComponents/FilterContainer";
import RocketIcon from "@mui/icons-material/Rocket";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import Brightness5SharpIcon from "@mui/icons-material/Brightness5Sharp";
import IosShareTwoToneIcon from "@mui/icons-material/IosShareTwoTone";
const Feed = () => {
  const filteredPosts = useSelector((state) => state.filteredPosts);
  return (
    <Box flex={3} sx={{ mt: 10 }}>
      <FilterContainer display="flex" direction="row" />
      {filteredPosts?.map((post) => (
        <LargerPost {...post} key={post.title} />
      ))}
    </Box>
  );
};

export default Feed;
