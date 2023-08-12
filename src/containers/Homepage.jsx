import React, { useState, useEffect } from "react";

import { Fab, Stack, Tooltip, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import NewPostModal from "../components/HomePageComponents/NewPostModal";
import Footer from "../components/Footer";
import Sidebar from "../components/HomePageComponents/Sidebar";
import Feed from "../components/HomePageComponents/Feed";
import RightBar from "../components/HomePageComponents/RightBar";
import LeftNewPostButton from "../components/LeftNewPostButton";
import { useSelector } from "react-redux";

const Homepage = () => {
  const [open, setOpen] = useState(false);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between" gap="1em">
        <Sidebar />
        <Feed />
        <RightBar />
      </Stack>
      {isLoggedIn && <LeftNewPostButton setOpen={setOpen} />}
      <NewPostModal open={open} setOpen={setOpen} />
    </Box>
  );
};

export default Homepage;

{
  /* <Footer /> */
}
