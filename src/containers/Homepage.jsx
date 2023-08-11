import React, { useState, useEffect } from "react";

import { Fab, Stack, Tooltip, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import NewPostModal from "../components/HomePageComponents/NewPostModal";
import Footer from "../components/Footer";
import Sidebar from "../components/HomePageComponents/Sidebar";
import Feed from "../components/HomePageComponents/Feed";
import RightBar from "../components/HomePageComponents/RightBar";

const Homepage = () => {
  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Sidebar />
        <Feed />
        <RightBar />
      </Stack>
      <NewPostModal />
    </Box>
  );
};

export default Homepage;

{
  /* <Footer /> */
}
