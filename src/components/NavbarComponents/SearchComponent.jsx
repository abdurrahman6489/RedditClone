import React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { useDispatch } from "react-redux";
import { filterPost } from "../../action";
import { filterObject } from "../../Utils/utils";
import { TextField } from "@mui/material";
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius + 10,
  backgroundColor: "lightGray",
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "50%",
  [theme.breakpoints.down("md")]: {
    marginLeft: theme.spacing(3),
    width: "70%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  maxWidth: "100%",
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
    width: "100%",
    [theme.breakpoints.down("md")]: {
      marginLeft: theme.spacing(3),
      width: "100%",
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
        <TextField
          value={searchQuery}
          fullWidth
          onChange={handleSearch}
          placeholder="Search…"
          color="primary"
          sx={{ border: "none", borderRadius: "2em" }}
        />
      </Search>
    </>
  );
};

export default SearchComponent;
