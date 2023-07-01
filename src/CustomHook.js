import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostandUser } from "./action";

const POST_KEY = "postData";
const USERS_KEY = "usersData";

const savedPostData = JSON.parse(localStorage.getItem(POST_KEY)) || [];
const savedUsersData = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

const POST_URL = "https://api.slingacademy.com/v1/sample-data/photos?limit=50";
const USER_URL = "https://dummyjson.com/users?limit=50";

export default function useLocalStorage() {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const users = useSelector((state) => state.users);

  const fetchApi = async () => {
    const response = await fetch(POST_URL);
    const data = await response.json();

    const userResponse = await fetch(USER_URL);
    const userData = await userResponse.json();

    const newPosts = data.photos.map((photo, index) => ({
      ...photo,
      upvote: generateReaction(200, 600),
      downvote: generateReaction(100, 200),
      voteStatus: false,
      username: userData.users[index].firstName,
      time: Date.now(),
    }));

    dispatch(fetchPostandUser(newPosts, userData.users));
  };

  useEffect(() => {
    if (savedPostData.length > 0 && savedUsersData.length > 0) {
      dispatch(fetchPostandUser(savedPostData, savedUsersData));
    } else fetchApi();
  }, []);

  useEffect(() => {
    saveDatatoLocalStorage(POST_KEY, posts);
    saveDatatoLocalStorage(USERS_KEY, users);
  }, [posts, users]);
}

const saveDatatoLocalStorage = (KEY, data) => {
  localStorage.setItem(KEY, JSON.stringify(data));
};

const generateReaction = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
