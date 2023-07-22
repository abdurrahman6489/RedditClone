import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchPostandUser,
  getAllComments,
  getSelectedPost,
  loginWithGoogle,
} from "./action";

const POST_KEY = "postData";
const USERS_KEY = "usersData";
const USER_COMMENT_KEY = "commentdata";
const SELECTED_POST_KEY = "selectedPostdata";
const CURRENT_USER_KEY = "currentUser_key";

const savedPostData = JSON.parse(localStorage.getItem(POST_KEY)) || [];
const savedUsersData = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
const selectedPostData =
  JSON.parse(localStorage.getItem(SELECTED_POST_KEY)) || {};
const commentData = JSON.parse(localStorage.getItem(USER_COMMENT_KEY)) || {};
const currentUserData =
  JSON.parse(localStorage.getItem(CURRENT_USER_KEY)) || {};

const POST_URL = "https://api.slingacademy.com/v1/sample-data/photos?limit=50";
const USER_URL = "https://dummyjson.com/users?limit=50";
const userAvatarUrl = "";

export default function useLocalStorage() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);
  const comments = useSelector((state) => state.comments);
  const selectedPost = useSelector((state) => state.selectedPost);
  const currentUser = useSelector((state) => state.currentUser);
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
      userAvatar: getUserAvatar(index),
      time: new Date().toLocaleString(),
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

    if (Object.keys(selectedPostData).length > 0)
      dispatch(getSelectedPost(selectedPostData.id));

    if (currentUserData.username && currentUserData.firstName) {
      const { username, firstName } = currentUserData;
      dispatch(loginWithGoogle(username, firstName));
    }
  }, []);

  useEffect(() => {
    saveDatatoLocalStorage(POST_KEY, posts);
    saveDatatoLocalStorage(USERS_KEY, users);
    saveDatatoLocalStorage(USER_COMMENT_KEY, comments);
    saveDatatoLocalStorage(SELECTED_POST_KEY, selectedPost);
    saveDatatoLocalStorage(CURRENT_USER_KEY, currentUser);
    // console.log("from custom hook file ", upvote);
  }, [posts, users, comments, selectedPost, currentUser]);
}

const saveDatatoLocalStorage = (KEY, data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

const generateReaction = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getUserAvatar = (index) => {
  return `https://xsgames.co/randomusers/assets/avatars/male/${index}.jpg`;
};

const getFollowStatus = () => {
  let number = Math.floor(Math.random() * 100) + 1;
  return number % 2 == 0;
};
