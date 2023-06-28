export const fetchPostandUser = (posts, users) => {
  return {
    type: "fetchPostandUser",
    payload: { posts, users },
  };
};

export const changeUpvote = ({ id, upvote }) => {
  return {
    type: "upvote",
    payload: { id, upvote },
  };
};

export const changeDownvote = ({ id, downvote }) => {
  return {
    type: "downvote",
    payload: { id, downvote },
  };
};

export const addPost = ({ title, description, url }) => {
  return {
    type: "addPost",
    payload: { title, description, url },
  };
};

export const loginUser = (username, password, index) => {
  return {
    type: "loginUser",
    payload: { username, password },
    index,
  };
};
export const setMsg = (msg) => {
  return {
    type: "setMsg",
    payload: { msg },
  };
};
