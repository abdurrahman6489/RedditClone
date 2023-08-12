import { Box, List } from "@mui/material";

import React, { useState } from "react";

import FeedFilter from "../FeedFilter";
import Community from "../Community";
const Sidebar = () => {
  const [selected, setSelected] = useState(-1);

  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: { xs: "none", sm: "none", md: "block", lg: "block" },
        mt: 7,
        backgroundColor: "#FFF",
        minHeight: "100vh",
      }}
    >
      <Box
        position="fixed"
        sx={{
          minHeight: "100vh",
          backgroundColor: "#FFF",
        }}
      >
        <List>
          <FeedFilter />
        </List>
        <List>
          <Community />
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
