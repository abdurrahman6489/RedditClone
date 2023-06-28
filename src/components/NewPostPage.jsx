import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost, setMsg } from "../action";
import SuccessfulPage from "./SuccessfulPage";
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
  Textarea,
  useDisclosure,
} from "@chakra-ui/react";

const NewPostPage = ({ isOpen, onClose }) => {
  const [post, setPost] = useState({ title: "", description: "", url: "" });
  const dispatch = useDispatch();
  const {
    isOpen: isSuccessOpen,
    onOpen: onSucessOpen,
    onClose: onSucessClose,
  } = useDisclosure();
  const handleChange = (event) => {
    setPost((oldPost) => ({
      ...oldPost,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFileSelect = (event) => {
    let value = URL.createObjectURL(event.target.files[0]);
    setPost((oldPost) => ({ ...oldPost, url: value }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const { title, description, url } = post;
    if (title.length == 0 || description.length == 0 || url.length == 0) return;
    dispatch(setMsg("Post added successfully"));
    onSucessOpen();
    onClose();
    dispatch(addPost({ title, description, url }));
    setPost({ title: "", description: "", url: "" });
  };

  return (
    <>
      <SuccessfulPage isOpen={isSuccessOpen} onClose={onSucessClose} />
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl onSubmit={handleSubmit}>
              <FormLabel htmlFor="title"></FormLabel>
              <Input
                type="text"
                name="title"
                placeholder="Enter Post Title"
                value={post.title}
                onChange={handleChange}
              />
              <FormLabel htmlFor="image"></FormLabel>
              <Input
                colorScheme="blackAlpha"
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
              />
              <FormLabel htmlFor="password"></FormLabel>
              <Textarea
                type="text"
                name="description"
                placeholder="Write your post"
                value={post.description}
                size="lg"
                onChange={handleChange}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost" onClick={handleSubmit}>
              Add the Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewPostPage;
