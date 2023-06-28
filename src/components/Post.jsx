import React from "react";
import {
  Card,
  Stack,
  Heading,
  Button,
  ButtonGroup,
  Image,
  Text,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
} from "@chakra-ui/react";
import { ArrowDownIcon, ArrowUpIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { changeUpvote, changeDownvote } from "../action";

const btnStyle = {
  maxWidth: "60%",
  minWidth: "40%",
  borderRadius: "1em",
  width: "50%",
};

const Post = ({
  title,
  description,
  url,
  upvote,
  downvote,
  username,
  id,
  onOpen,
}) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  return (
    <Card maxW="sm">
      <CardBody>
        <Image src={url} alt={description} borderRadius="lg" />
        <Stack mt="6" spacing="3">
          <Heading size="md">{title}</Heading>
          <Text>{description}</Text>
          <Text color="blue.600" fontSize="2xl">
            Posted by : {username}
          </Text>
        </Stack>
      </CardBody>
      <Divider />
      <CardFooter>
        <ButtonGroup spacing="2">
          <Button
            variant="solid"
            colorScheme="green"
            leftIcon={<ArrowUpIcon />}
            style={btnStyle}
            onClick={() =>
              isLoggedIn ? dispatch(changeUpvote({ id, upvote })) : onOpen()
            }
          >
            Upvote : {upvote}
          </Button>
          <Button
            variant="ghost"
            colorScheme="orange"
            rightIcon={<ArrowDownIcon />}
            style={{ ...btnStyle }}
            onClick={() =>
              isLoggedIn ? dispatch(changeDownvote({ id, downvote })) : onOpen()
            }
          >
            Downvote : {downvote}
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default Post;
