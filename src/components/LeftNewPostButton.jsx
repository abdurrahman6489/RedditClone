import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import React, { useState } from "react";

const LeftNewPostButton = ({ setOpen }) => {
  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <Tooltip
      onClick={handleOpen}
      title="Create Post"
      sx={{
        position: "fixed",
        bottom: 72,
        left: { xs: "calc(50% - 25px)", md: 30 },
      }}
    >
      <Fab color="primary" aria-label="Create Post">
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default LeftNewPostButton;
