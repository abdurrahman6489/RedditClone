import { filterObject } from "./utils";
const filterCallback = {
  0: (elem) => true,
  1: (elem) => elem.upvote / elem.downvote > 3,
  2: (elem) =>
    elem.upvote / elem.downvote > 1.5 && elem.upvote / elem.downvote <= 3,
  3: (elem) =>
    elem.upvote / elem.downvote >= 1 && elem.upvote / elem.downvote < 1.5,
};
const INITIAL_STATE = {
  posts: [],
  filteredPosts: [],
  users: [],
  isLoggedIn: false,
  successMsg: "",
  currentUser: { username: "", password: "", firstName: "" },
};

export const postReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case "fetchPostandUser":
      return {
        ...state,
        posts: [...action.payload.posts],
        filteredPosts: filterObject["Best"]["filterThePosts"](
          action.payload.posts
        ),
        users: [...action.payload.users],
      };

    case "upvote":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                upvote: !post.voteStatus
                  ? action.payload.upvote + 1
                  : action.payload.upvote,
                voteStatus: true,
              }
            : post
        ),
      };

    case "downvote":
      return {
        ...state,
        posts: state.posts.map((post) =>
          post.id === action.payload.id
            ? {
                ...post,
                downvote: !post.voteStatus
                  ? action.payload.downvote + 1
                  : action.payload.downvote,
                voteStatus: true,
              }
            : post
        ),
      };

    case "addPost":
      return {
        ...state,
        posts: [
          {
            id: state.posts.length + 1,
            ...action.payload,
            upvote: 0,
            downvote: 0,
            time: Date.now(),
            username: state.currentUser.firstName || "",
          },
          ...state.posts,
        ],
      };

    case "filterPost":
      return {
        ...state,
        filteredPosts: filterObject[action.payload].filterThePosts(state.posts),
      };

    case "loginUser":
      return {
        ...state,
        currentUser: {
          ...action.payload,
          firstName: state.users[action.index].firstName,
        },
        isLoggedIn: true,
      };

    case "addUser":
      const { username, password, firstName, lastName } = action.payload;
      return {
        ...state,
        currentUser: { ...state.currentUser, username, password, firstName },
        users: [
          ...state.users,
          { id: state.users.length + 1, ...action.payload },
        ],
        isLoggedIn: true,
      };

    case "loginWithGoogle":
      const { googleUsername, googleFirstName } = action.payload;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          username: googleUsername,
          firstName: googleFirstName,
        },
        isLoggedIn: true,
      };

    case "userLogout":
      return {
        ...state,
        isLoggedIn: false,
      };

    case "setMsg":
      return { ...state, successMsg: action.payload.msg };
  }

  return state;
};
