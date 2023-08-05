import { Typography } from "@mui/material";
import React from "react";
import { findDays } from "../../Utils/utils";

const DateComponent = ({ date }) => {
  const stringDate = findDays(date);
  return (
    <Typography variant="body2" sx={{ mt: "2vh" }}>
      {stringDate}
    </Typography>
  );
};

export default DateComponent;
