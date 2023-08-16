import { filterObject, chipProps } from "./Utils/utils";
import { changeVote } from "./Utils/changeVote.js";
import comments from "./Utils/comments";
import INITIAL_POPUP_STATUS from "./INITIAL_STATES/initial_popup_status.js";
import INITIAL_CURRENT_USER from "./INITIAL_STATES/initial_current_user.js";
import INITIAL_STATE from "./INITIAL_STATES/initial_state";

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
      const updatedArrayUpvote = changeVote.changeUpvote(state.posts, action);
      const currentUpvotePost = updatedArrayUpvote
        .slice()
        .find((post) => post.id == action.payload.id);
      return {
        ...state,
        posts: updatedArrayUpvote,
        filteredPosts:
          filterObject[state.currentFilter].filterThePosts(updatedArrayUpvote),
        selectedPost: { ...state.selectedPost, ...currentUpvotePost },
      };

    case "downvote":
      const updatedArrayDownvote = changeVote.changeDownvote(
        state.posts,
        action
      );
      const currentDownvotePost = updatedArrayDownvote
        .slice()
        .find((post) => post.id == action.payload.id);
      return {
        ...state,
        posts: updatedArrayDownvote,
        filteredPosts:
          filterObject[state.currentFilter].filterThePosts(
            updatedArrayDownvote
          ),
        selectedPost: { ...state.selectedPost, ...currentDownvotePost },
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
      const newFiltersArray = state.filtersArray.map((filter) =>
        filter.label == action.payload
          ? { ...filter, status: true }
          : { ...filter, status: false }
      );
      return {
        ...state,
        filteredPosts: filterObject[action.payload].filterThePosts(
          state.posts,
          action.searchQuery
        ),
        currentFilter: action.payload,
        filtersArray: [...newFiltersArray],
      };

    case "getSelectedPost":
      const curentSelectedPost = state.posts.find(
        (post) => post.id === action.payload.id
      );
      return {
        ...state,
        selectedPost: { ...state.selectedPost, ...curentSelectedPost },
      };

    case "getAllComments":
      return {
        ...state,
        comments: { ...state.comments, ...action.payload },
      };

    case "addComment":
      const { comment, id } = action.payload;
      const newComments = comments.updateComments(
        state.comments,
        comment,
        id,
        state.currentUser.firstName
      );
      return {
        ...state,
        comments: {
          ...state.comments,
          ...newComments,
        },
      };

    case "deleteComment":
      const { id: currentId, date } = action.payload;
      const updatedComments = comments.deleteComment(
        state.comments,
        currentId,
        state.currentUser.firstName,
        date
      );
      return {
        ...state,
        comments: {
          ...state.comments,
          ...updatedComments,
        },
      };

    case "openToEdit":
      const toBeEditedComments = comments.openInputToEdit(
        state.comments,
        action.payload.id,
        state.currentUser.firstName,
        action.payload.date
      );
      return {
        ...state,
        comments: {
          ...state.comments,
          ...toBeEditedComments,
        },
      };

    case "editComment":
      const editedComments = comments.editComments(
        state.comments,
        action.payload.comment,
        action.payload.id,
        state.currentUser.firstName,
        action.payload.date
      );

      return {
        ...state,
        comments: {
          ...state.comments,
          ...editedComments,
        },
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
      const { googleUsername, googleFirstName, googlePhotoURL } =
        action.payload;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          username: googleUsername,
          firstName: googleFirstName,
          photoURL: googlePhotoURL,
        },
        isLoggedIn: true,
      };

    case "userLogout":
      return {
        ...state,
        filteredPosts: filterObject["Best"]["filterThePosts"](state.posts),
        filtersArray: [...chipProps],
        currentUser: { ...state.currentUser, ...INITIAL_CURRENT_USER },
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
    case "openLoginModal":
      return {
        ...state,
        logInModalOpen: true,
      };

    case "closeLoginModal":
      return {
        ...state,
        logInModalOpen: false,
      };

    case "openSignupModal":
      return {
        ...state,
        signupModalOpen: true,
      };

    case "closeSignupModal":
      return {
        ...state,
        signupModalOpen: false,
      };
  }
  return state;
};
