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
      direction="row"
      gap={1}
      justifyContent="center"
      alignItems="center"
      sx={{ mt: "40vh" }}
    >
      <Box>
        <Typography variant="h4" color="gray">
          Oops
        </Typography>
        <Typography variant="h6">
          It seems you have landed a wrong page
        </Typography>
        <Typography variant="body2">
          <i>{error.statusText || error.message}</i>
        </Typography>
      </Box>
    </Stack>
  );
};

export default ErrorPage;
