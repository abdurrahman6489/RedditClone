import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostandUser, getAllComments } from "./action";

const POST_KEY = "postData";
const USERS_KEY = "usersData";
const USER_COMMENT_KEY = "commentdata";

const savedPostData = JSON.parse(localStorage.getItem(POST_KEY)) || [];
const savedUsersData = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
const commentData = JSON.parse(localStorage.getItem(USER_COMMENT_KEY)) || {};

const POST_URL = "https://api.slingacademy.com/v1/sample-data/photos?limit=50";
const USER_URL = "https://dummyjson.com/users?limit=50";

export default function useLocalStorage() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const comments = useSelector((state) => state.comments);
  const fetchApi = async () => {
    const response = await fetch(POST_URL);
    const data = await response.json();

    const userResponse = await fetch(USER_URL);
    const userData = await userResponse.json();

    const newPosts = data.photos.map((photo, index) => ({
      ...photo,
      upvote: generateReaction(200, 600),
      downvote: generateReaction(100, 200),
      upvoteStatus: false,
      downvoteStatus: false,
      username: userData.users[index].firstName,
      time: Date.now(),
      isHomeCommunity: getFollowStatus(),
    }));

    dispatch(fetchPostandUser(newPosts, userData.users));
  };

  useEffect(() => {
    if (savedPostData.length > 0 && savedUsersData.length > 0) {
      dispatch(fetchPostandUser(savedPostData, savedUsersData));
    } else fetchApi();

    if (Object.keys(commentData).length > 0)
      dispatch(getAllComments(commentData));
  }, []);

  useEffect(() => {
    saveDatatoLocalStorage(POST_KEY, posts);
    saveDatatoLocalStorage(USERS_KEY, users);
    saveDatatoLocalStorage(USER_COMMENT_KEY, comments);
    // console.log("from custom hook file ", upvote);
  }, [posts, users, comments]);
}

const saveDatatoLocalStorage = (KEY, data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

const generateReaction = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getFollowStatus = () => {
  let number = Math.floor(Math.random() * 100) + 1;
  return number % 2 == 0;
};
