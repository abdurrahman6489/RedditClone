import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Center,
  Spacer,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { setMsg } from "../action";
const SuccessfulPage = ({ isOpen, onClose }) => {
  const msg = useSelector((state) => state.successMsg);
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setMsg(""));
    onClose();
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalBody>
            <Center>
              <CheckCircleIcon boxSize={12} color="green.500" />
            </Center>
            <Center>
              <Text fontSize="1.4em">{msg}</Text>
            </Center>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleClick}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default SuccessfulPage;
