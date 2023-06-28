import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useLocalStorage from "./CustomHooks";
import { setMsg } from "./action";
import {
  Button,
  useDisclosure,
  IconButton,
  Icon,
  Flex,
  Box,
  Text,
  HStack,
} from "@chakra-ui/react";
import { AiFillRedditCircle, AiOutlineLogin } from "react-icons/ai";
import "./App.css";

import Post from "./components/Post";
import LoginPage from "./components/LoginPage";
import NewPostPage from "./components/NewPostPage";
import Navbar from "./components/Navbar/Navbar";
import SuccessfulPage from "./components/SuccessfulPage";

function App() {
  useLocalStorage();
  const posts = useSelector((state) => state.posts);
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isPostOpen,
    onOpen: onPostOpen,
    onClose: onPostClose,
  } = useDisclosure();
  const {
    isOpen: isSucessOpen,
    onOpen: onSucessOpen,
    onClose: onSucessClose,
  } = useDisclosure();

  const handleClick = () => {
    if (isLoggedIn) {
      dispatch(setMsg("You are already Logged in"));
      onSucessOpen();
      return;
    }
    onOpen();
  };

  return (
    <div className="container">
      <Navbar>
        <Flex align="center">
          <HStack>
            <Box>
              <Icon as={AiFillRedditCircle} color="#ff4500" boxSize="3em" />
            </Box>
            <Box>
              <Text fontSize="2em">reddit</Text>
            </Box>
          </HStack>
        </Flex>
        <Button
          colorScheme="red"
          size="lg"
          variant="solid"
          style={{
            borderRadius: "1em",
            maxWidth: "30%",
            backgroundColor: "#ff4500",
          }}
          onClick={() => (isLoggedIn ? onPostOpen() : onOpen())}
        >
          Add Post
        </Button>
        <IconButton
          colorScheme="red"
          aria-label="Login"
          isRound="true"
          title="Login"
          style={{ padding: "0.2em", backgroundColor: "#ff4500" }}
          icon={<Icon as={AiOutlineLogin} color="white" boxSize="3em" />}
          onClick={handleClick}
        >
          Reddit Clone{" "}
        </IconButton>
      </Navbar>
      <LoginPage isOpen={isOpen} onClose={onClose} />
      <NewPostPage isOpen={isPostOpen} onClose={onPostClose} />
      <SuccessfulPage isOpen={isSucessOpen} onClose={onSucessClose} />
      <div className="grid-container">
        {posts &&
          posts.map((post) => <Post {...post} onOpen={onOpen} key={post.id} />)}
      </div>
    </div>
  );
}

export default App;
