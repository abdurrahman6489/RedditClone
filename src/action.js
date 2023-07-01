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

export const loginWithGoogle = (
  googleUsername,
  googleFirstName,
  googleLastName
) => {
  return {
    type: "loginWithGoogle",
    payload: { googleUsername, googleFirstName, googleLastName },
  };
};

export const addUser = ({ username, password, firstName, lastName }) => {
  return {
    type: "addUser",
    payload: { username, password, firstName, lastName },
  };
};

export const filterPost = (label) => {
  return {
    type: "filterPost",
    payload: label,
  };
};

export const setMsg = (msg) => {
  return {
    type: "setMsg",
    payload: { msg },
  };
};
