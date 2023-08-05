import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { filterPost } from "../../action";
import { filterObject } from "../../Utils/utils";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius + 10,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "350dvw",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  width: "35dvw",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "35dvw",
    [theme.breakpoints.up("md")]: {
      width: "35dvw",
    },
  },
}));

const searchIndex = Object.keys(filterObject).indexOf("Search");
const searchLabel = filterObject["Search"]["label"];
const SearchComponent = () => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = React.useState("");
  const handleSearch = (event) => {
    let value = event.target.value;
    setSearchQuery(value);
    if (value.length == 0) {
      dispatch(filterPost("Best", 1));
      return;
    }
    dispatch(filterPost(searchLabel, searchIndex, value));
  };
  return (
    <>
      {" "}
      <Search>
        <SearchIconWrapper>
          <SearchIcon sx={{ position: "absolute", right: "1dvw" }} />
        </SearchIconWrapper>
        <StyledInputBase
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search…"
          inputProps={{
            "aria-label": "search",
          }}
        />
      </Search>
    </>
  );
};

export default SearchComponent;
