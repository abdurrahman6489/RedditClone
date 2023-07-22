import { all } from "axios";

export const chipVariantStatus = [false, true, false, false, false];
export const filterObject = {
  All: { label: "All", color: "primary", filterThePosts: (array) => array },
  Best: {
    label: "Best",
    color: "success",
    filterThePosts: (array) =>
      array
        .slice()
        .sort(
          (post1, post2) =>
            post2.upvote / post2.downvote - post1.upvote / post1.downvote
        ),
  },

  Hot: {
    label: "Hot",
    color: "secondary",
    filterThePosts: (array) =>
      array.filter(
        (post) =>
          post.upvote / post.downvote >= 1 && post.upvote / post.downvote < 1.5
      ),
  },

  New: {
    label: "New",
    color: "error",
    filterThePosts: (array) =>
      array
        .slice()
        .sort((post1, post2) => post2.time.localeCompare(post1.time)),
  },

  Top: {
    label: "Top",
    color: "info",
    filterThePosts: (array) =>
      array.slice().sort((post1, post2) => post2.upvote - post1.upvote),
  },
  Search: {
    label: "Search",
    color: "Success",
    filterThePosts: (array, searchQuery) =>
      array.filter(
        (post) =>
          post.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
  },

  Home: {
    label: "Home",
    color: "Success",
    filterThePosts: (array) => array.filter((post) => post.isHomeCommunity),
  },

  Popular: {
    label: "Popular",
    color: "secondary",
    filterThePosts: (array) =>
      array.slice().sort((post1, post2) => post2.upvote - post1.upvote),
  },
};

const filterObjectLength = Object.keys(filterObject).length;

export const chipProps = Object.keys(filterObject)
  .filter((elem, index) => index <= 4)
  .map((chipProp, index) => {
    const { label, color } = filterObject[chipProp];
    let status = index == 1 ? true : false;
    return { label, color, status };
  });

export const selectTagProps = Object.keys(filterObject)
  .filter((elem, index) => index >= filterObjectLength - 2)
  .map((selectProp) => {
    const { label } = filterObject[selectProp];
    return { value: label, content: label };
  });

export const signalProps = { warning: "warning", success: "success" };

export const changeVote = {
  changeUpvote: (posts, action) =>
    posts.map((post) =>
      post.id === action.payload.id
        ? {
            ...post,
            downvoteStatus: false,
            downvote: !post.downvoteStatus ? post.downvote : post.downvote - 1,
            upvote: !post.upvoteStatus
              ? action.payload.upvote + 1
              : action.payload.upvote - 1,
            upvoteStatus: !post.upvoteStatus,
          }
        : post
    ),
  changeDownvote: (posts, action) =>
    posts.map((post) =>
      post.id === action.payload.id
        ? {
            ...post,
            upvoteStatus: false,
            upvote: !post.upvoteStatus ? post.upvote : post.upvote - 1,
            downvote: !post.downvoteStatus
              ? action.payload.downvote + 1
              : action.payload.downvote - 1,
            downvoteStatus: !post.downvoteStatus,
          }
        : post
    ),
};

export const updateComments = (comments, newComment, id, user) => {
  if (comments[id]) {
    comments[id] = [
      ...comments[id],
      {
        user,
        id,
        comment: newComment,
        date: new Date().toLocaleString(),
        color: color(),
      },
    ];
  } else {
    comments[id] = [
      {
        user,
        id,
        comment: newComment,
        date: new Date().toLocaleString(),
        color: color(),
      },
    ];
  }
  const newCommentObject = { ...comments };
  // console.log(newCommentObject);
  return newCommentObject;
};

export const deleteComment = (comments, id, user, date) => {
  console.log(id, date);
  if (!comments[id]) return { ...comments };
  comments[id].splice(
    comments[id].findIndex(
      (comment) => comment.user == user && comment.date == date
    ),
    1
  );
  return { ...comments };
};

const color = () => `hsl(${Math.floor(Math.random() * 100)}, 80%, 50%)`;
