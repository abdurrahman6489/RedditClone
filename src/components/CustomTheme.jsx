import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

function createCustomTheme(primaryColor, secondaryColor) {
  const theme = createTheme({
    palette: {
      primary: {
        main: primaryColor,
      },
      secondary: {
        main: secondaryColor,
      },
    },
  });
  return theme;
}

const CustomTheme = ({ children, primaryColor, secondaryColor }) => {
  const theme = createCustomTheme(primaryColor, secondaryColor);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomTheme;
