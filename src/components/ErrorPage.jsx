import React from "react";
import { useRouteError } from "react-router-dom";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);
  return (
    <Stack
      direction="column"
      gap={1}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: "10vh" }}
    >
      <img src="src\reddit404d.png" height="40%" width="40%" />
      <Box
        textAlign="center"
        sx={{ fontFamily: 'Verdana Arial Helvetica "Sans-serif"' }}
      >
        <Typography variant="h6">page not found</Typography>
        <Typography variant="body2">
          the page you requested does not exist
        </Typography>
      </Box>
    </Stack>
  );
};

export default ErrorPage;
