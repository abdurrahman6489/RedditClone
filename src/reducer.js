import { filterObject } from "./utils";
const filterCallback = {
  0: (elem) => true,
  1: (elem) => elem.upvote / elem.downvote > 3,
  2: (elem) =>
    elem.upvote / elem.downvote > 1.5 && elem.upvote / elem.downvote <= 3,
  3: (elem) =>
    elem.upvote / elem.downvote >= 1 && elem.upvote / elem.downvote < 1.5,
};

const INITIAL_POPUP_STATUS = {
  open: false,
  msg: "",
  signal: "",
};

const INITIAL_STATE = {
  posts: [],
  filteredPosts: [],
  users: [],
  currentUser: { username: "", password: "", firstName: "" },
  popUp: INITIAL_POPUP_STATUS,
  currentFilter: Object.keys(filterObject)[1],
  isLoggedIn: false,
};

export const postReducer = (state = INITIAL_STATE, action = {}) => {
  switch (action.type) {
    case "fetchPostandUser":
      return {
        ...state,
        posts: [...action.payload.posts],
        filteredPosts: filterObject[state.currentFilter]["filterThePosts"](
          action.payload.posts
        ),
        users: [...action.payload.users],
      };

    case "upvote":
      const updatedArrayUpvote = state.posts.map((post) =>
        post.id === action.payload.id
          ? {
              ...post,
              upvote: !post.voteStatus
                ? action.payload.upvote + 1
                : action.payload.upvote,
              voteStatus: true,
            }
          : post
      );
      return {
        ...state,
        posts: updatedArrayUpvote,
        filteredPosts:
          filterObject[state.currentFilter].filterThePosts(updatedArrayUpvote),
      };

    case "downvote":
      const updatedArrayDownvote = state.posts.map((post) =>
        post.id === action.payload.id
          ? {
              ...post,
              downvote: !post.voteStatus
                ? action.payload.downvote + 1
                : action.payload.downvote,
              voteStatus: true,
            }
          : post
      );
      return {
        ...state,
        posts: updatedArrayDownvote,
        filteredPosts:
          filterObject[state.currentFilter].filterThePosts(
            updatedArrayDownvote
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
        currentFilter: action.payload,
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
        filteredPosts: filterObject["Best"]["filterThePosts"](state.posts),
        isLoggedIn: false,
      };

    case "setMsg":
      return {
        ...state,
        popUp: { ...state.popUp, open: true, ...action.payload },
      };
    case "closeModal":
      return {
        ...state,
        popUp: { ...state.popUp, ...INITIAL_POPUP_STATUS },
      };
  }

  return state;
};
