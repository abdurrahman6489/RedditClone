import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../../action";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
const LogoutButton = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  return (
    <>
      {isLoggedIn && (
        <IconButton
          size="large"
          aria-label="Logout"
          color="inherit"
          sx={{ color: { xs: "#333", sm: "#333", md: "#333", lg: "#333" } }}
          onClick={() => dispatch(userLogout())}
        >
          <Typography variant="body1" sx={{ display: "inline" }}>
            Logout
          </Typography>
          {/* <LogoutIcon fontSize="small" sx={{ mb: 0.5 }} /> */}
        </IconButton>
      )}
    </>
  );
};
export default LogoutButton;
