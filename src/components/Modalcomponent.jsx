import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Actionicons from "./Actionicons";
import { setMsg, closeModal } from "../action";
import { useSelector, useDispatch } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  borderRadius: "1em",
};

const Modalcomponent = ({ children }) => {
  const popUp = useSelector((state) => state.popUp);
  const dispatch = useDispatch();

  const { open, msg, signal } = popUp;

  const handleClose = () => dispatch(closeModal());
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Actionicons signal={signal} />
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {msg}
          </Typography>
          {children}
        </Box>
      </Modal>
    </div>
  );
};

export default Modalcomponent;
