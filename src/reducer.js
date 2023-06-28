const INITIAL_STATE = {
  posts: [],
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
            username: state.currentUser.firstName || "",
          },
          ...state.posts,
        ],
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

    case "setMsg":
      return { ...state, successMsg: action.payload.msg };
  }

  return state;
};
