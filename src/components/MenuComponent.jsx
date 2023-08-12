import React from "react";
import Menu from "@mui/material/Menu";
import { Box, IconButton, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import Filter from "../filterComponents/Filter";

const MenuComponent = ({ children }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const filtersArray = useSelector((state) => state.filtersArray);
  const filteredArray = filtersArray.filter(
    (filter) =>
      filter.label == "Home" ||
      filter.label == "All" ||
      filter.label == "Popular"
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Box sx={{ display: { xs: "block", sm: "block", md: "none", lg: "none" } }}>
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        sx={{ color: "#333", mr: 2 }}
        onClick={handleClick}
      >
        <MenuIcon fontSize="small" />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        {filteredArray?.map((filter, index) => {
          return (
            <MenuItem key={filter.label}>
              <Filter {...filter} index={index} key={filter.label} />
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

export default MenuComponent;
