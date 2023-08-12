import { Box, Divider, Fab, Stack, Typography } from "@mui/material";
import SecurityIcon from "@mui/icons-material/Security";

import React, { useState } from "react";
import CustomTheme from "../CustomTheme";
import FeatureComingSoon from "../FeatureComingSoon";

const primaryColor = "#D93A00";
const secondaryColor = "#FFF";

const RightBar = () => {
  const [open, setOpen] = useState(false);
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
      <Box position="fixed">
        <CustomTheme
          primaryColor={primaryColor}
          secondaryColor={secondaryColor}
        >
          <Box sx={{ backgroundColor: "#FFF", p: 2 }}>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "flexStart",
                alignItems: "center",
              }}
            >
              <Box flex={1}>
                <SecurityIcon color="primary" fontSize="large" />
              </Box>
              <Box flex={4}>
                <Typography variant="h6">Reddit Premium</Typography>
                <Typography variant="body2">
                  The best Reddit experience
                </Typography>
              </Box>
            </Stack>
            <Fab
              variant="extended"
              color="primary"
              sx={{ width: "100%", mt: "3vh" }}
              size="small"
              onClick={() => setOpen(true)}
            >
              Try Now
            </Fab>
          </Box>
        </CustomTheme>
        <Divider />
        <Box sx={{ backgroundColor: "#FFF", p: 2, mt: 4 }}>
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "flexStart",
              alignItems: "center",
            }}
          >
            <Box flex={1}>
              <img
                src="src\snoo-home@2x.png"
                width="100%"
                height="100%"
                alt="reddit"
              />
            </Box>
            <Box flex={4}>
              <Typography variant="h6">Home</Typography>
            </Box>
          </Stack>
          <Fab
            variant="extended"
            color="primary"
            sx={{ width: "100%", mt: "3vh" }}
            size="small"
            onClick={() => setOpen(true)}
          >
            Create Community
          </Fab>
        </Box>
      </Box>

      <FeatureComingSoon open={open} setOpen={setOpen} />
    </Box>
  );
};

export default RightBar;
