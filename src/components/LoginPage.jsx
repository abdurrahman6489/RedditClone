import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setMsg } from "../action";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  useDisclosure,
} from "@chakra-ui/react";
import SuccessfulPage from "./SuccessfulPage";

const LoginPage = ({ isOpen, onClose }) => {
  const users = useSelector((state) => state.users);
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  const {
    isOpen: isSuccessOpen,
    onOpen: onSucessOpen,
    onClose: onSucessClose,
  } = useDisclosure();

  const handleChange = (event) => {
    setUser((olduser) => ({
      ...olduser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { username, password } = user;
    if (username.length == 0 || password.length == 0) {
      setError("Please fill all the fields");
      return;
    }
    const userIndex = users.findIndex(
      (currentUser) =>
        currentUser.username == username && currentUser.password == password
    );
    if (userIndex > -1) {
      dispatch(setMsg("Login successful"));
      onSucessOpen();
      dispatch(loginUser(username, password, userIndex));
      onClose();
    } else setError("User doesn't exist");
    setUser({ username: "", password: "" });
  };
  return (
    <>
      <SuccessfulPage isOpen={isSuccessOpen} onClose={onSucessClose} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign In</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl onSubmit={handleSubmit}>
              <FormLabel htmlFor="username"></FormLabel>
              <Input
                type="text"
                name="username"
                placeholder="Enter Username"
                value={user.username}
                onChange={handleChange}
              />
              <FormLabel htmlFor="password"></FormLabel>
              <Input
                type="password"
                name="password"
                placeholder="Enter Password"
                value={user.password}
                onChange={handleChange}
              />
              {error.length > 0 && <p style={{ color: "red" }}>{error}</p>}
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit}>
              Sign In
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default LoginPage;
