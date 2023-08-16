import React from "react";
import { auth, provider } from "../Utils/firebase";
import { signInWithPopup } from "@firebase/auth";
import { useDispatch } from "react-redux";
import {
  setMsg,
  loginWithGoogle,
  closeLoginModal,
  closeSignupModal,
} from "../action";
import { signalProps } from "../Utils/utils";
import { routepath } from "../Utils/routepaths";
import { useNavigate } from "react-router-dom";

import { Button, Fab, Typography } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
const SUCCESS_NAVIGATE_PAGE = routepath.home;
const { success } = signalProps;

const GOOGLE_BTN_STYLE = {
  width: "90%",
  border: "thin solid gray",
  borderRadius: "1em",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  margin: "auto",
  marginBottom: "3vh",
};

const GoogleLogin = ({ msg, successMsg }) => {
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
        dispatch(closeLoginModal());
        dispatch(closeSignupModal());
      })
      .catch((error) => {
        console.log("error ", error);
      });
  };

  return (
    <>
      <Fab
        variant="extended"
        sx={GOOGLE_BTN_STYLE}
        size="medium"
        color="secondary"
        onClick={onLoginClick}
      >
        <Typography variant="body2">{msg} with Google</Typography>
        <FcGoogle />
      </Fab>
    </>
  );
};

export default GoogleLogin;
