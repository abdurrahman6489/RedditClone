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

export const filterPost = (label, index = 1, searchQuery = "") => {
  return {
    type: "filterPost",
    payload: label,
    index,
    searchQuery,
  };
};

export const getSelectedPost = (id) => {
  return {
    type: "getSelectedPost",
    payload: { id },
  };
};

export const getAllComments = (comments) => {
  return {
    type: "getAllComments",
    payload: comments,
  };
};

export const addComment = (comment, id) => {
  return {
    type: "addComment",
    payload: { comment, id },
  };
};

export const deleteComment = (id, date) => {
  return {
    type: "deleteComment",
    payload: { id, date },
  };
};

export const openToEdit = (id, date) => {
  return {
    type: "openToEdit",
    payload: { id, date },
  };
};

export const editComment = (comment, id, date) => {
  return {
    type: "editComment",
    payload: { comment, id, date },
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
  googleUsername = "",
  googleFirstName = "",
  googleLastName = "",
  googlePhotoURL = ""
) => {
  return {
    type: "loginWithGoogle",
    payload: {
      googleUsername,
      googleFirstName,
      googleLastName,
      googlePhotoURL,
    },
  };
};

export const addUser = ({ username, password, firstName, lastName }) => {
  return {
    type: "addUser",
    payload: { username, password, firstName, lastName },
  };
};

export const userLogout = () => {
  return {
    type: "userLogout",
  };
};

export const setMsg = (msg, signal) => {
  return {
    type: "setMsg",
    payload: { msg, signal },
  };
};

export const closeModal = () => {
  return {
    type: "closeModal",
  };
};

export const openLoginModal = () => {
  return {
    type: "openLoginModal",
  };
};

export const closeLoginModal = () => {
  return {
    type: "closeLoginModal",
  };
};

export const openSignupModal = () => {
  return {
    type: "openSignupModal",
  };
};

export const closeSignupModal = () => {
  return {
    type: "closeSignupModal",
  };
};
