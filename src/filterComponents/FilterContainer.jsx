import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Stack from "@mui/material/Stack";

import Filter from "./Filter";
const FilterContainer = ({ display, direction }) => {
  const filtersArray = useSelector((state) => state.filtersArray);
  const filteredArray = filtersArray.filter(
    (filter) =>
      filter.label != "Home" &&
      filter.label != "Popular" &&
      filter.label != "All"
  );
  return (
    <Stack sx={{ display: display, flexDirection: direction }}>
      {filteredArray?.map((filter, index) => (
        <Filter {...filter} index={index} key={filter.label} />
      ))}
    </Stack>
  );
};

export default FilterContainer;
