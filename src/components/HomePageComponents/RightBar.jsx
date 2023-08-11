import { Box } from "@mui/material";
import React from "react";

const RightBar = () => {
  return (
    <Box
      flex={1}
      p={2}
      sx={{
        display: { xs: "none", sm: "none", md: "block", lg: "block" },
        mt: 8,
      }}
    >
      {/* RightBar */}
    </Box>
  );
};

export default RightBar;
