import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";

import Filter from "./Filter";
import { Box } from "@mui/material";
const FilterContainer = ({ display, direction }) => {
  const filtersArray = useSelector((state) => state.filtersArray);
  const filteredArray = filtersArray.filter(
    (filter) =>
      filter.label != "Home" &&
      filter.label != "Popular" &&
      filter.label != "All"
  );
  return (
    <Box
      sx={{
        backgroundColor: "#FFF",
        height: "10vh",
        display: "flex",
        alignItems: "center",
        mb: "3vh",
        borderRadius: "1em",
      }}
    >
      <Stack
        sx={{
          display: display,
          flexDirection: direction,
          gap: "2em",
          ml: 5,
        }}
      >
        {filteredArray?.map((filter, index) => (
          <Filter {...filter} index={index} key={filter.label} />
        ))}
      </Stack>
    </Box>
  );
};

export default FilterContainer;
