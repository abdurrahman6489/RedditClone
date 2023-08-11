import React, { useState, useEffect } from "react";
import Post from "../components/PostComponents/Post";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import { Stack } from "@mui/material";
import { selectTagProps } from "../Utils/utils";

import { useSelector, useDispatch } from "react-redux";
import Footer from "../components/Footer";
import Sidebar from "../components/HomePageComponents/Sidebar";
import Feed from "../components/HomePageComponents/Feed";
import RightBar from "../components/HomePageComponents/RightBar";

const Homepage = () => {
  return (
    <Stack direction="row" justifyContent="space-between">
      <Sidebar />
      <Feed />
      <RightBar />
    </Stack>
  );
};

export default Homepage;

{
  /* <Footer /> */
}
