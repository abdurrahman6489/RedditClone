import React from "react";
import { auth, provider } from "../Utils/firebase";
import { signInWithPopup } from "@firebase/auth";
import { useDispatch } from "react-redux";
import { setMsg, loginWithGoogle } from "../action";
import { signalProps } from "../Utils/utils";
import { routepath } from "../Utils/routepaths";
import { useNavigate } from "react-router-dom";

import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const SUCCESS_NAVIGATE_PAGE = routepath.home;
const { success } = signalProps;

const BTN_STYLE = {
  width: { lg: "30%", md: "40%" },
  borderRadius: "5px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "auto",
  marginBottom: "3vh",
};

const GoogleLogin = ({ msg, successMsg }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLoginClick = () => {
    console.log("clicked");
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log("result ", result);
        const userName = result.user.displayName;
        const photoURL = result.user.photoURL;
        const fullName = userName.split(" ");
        const firstName = fullName[0];
        const lastName = fullName[1];
        dispatch(loginWithGoogle(userName, firstName, lastName, photoURL));
        dispatch(
          setMsg(
            `Congratulatios ${userName}, you are successfully ${successMsg}`,
            success
          )
        );
        navigate(SUCCESS_NAVIGATE_PAGE);
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  return (
    <Button
      sx={BTN_STYLE}
      variant="outlined"
      startIcon={<GoogleIcon />}
      onClick={onLoginClick}
    >
      {msg} with Google
    </Button>
  );
};

export default GoogleLogin;
