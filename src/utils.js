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

const color = () => `hsl(${Math.floor(Math.random() * 100)}, 80%, 50%)`;

export const updateComments = (comments, newComment, id, user) => {
  const newCommentObj = {
    user,
    id,
    comment: newComment,
    changedText: newComment,
    isEdit: false,
    date: new Date().toLocaleString(),
    color: color(),
  };
  if (comments[id]) {
    comments[id] = [...comments[id], newCommentObj];
  } else {
    comments[id] = [newCommentObj];
  }
  const allCommentObject = { ...comments };
  // console.log(allCommentObject);
  return allCommentObject;
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

export const openInputToEdit = (comments, id, user, date) => {
  console.log(id, date);
  if (!comments[id]) return { ...comments };

  const editedComments = comments[id].map((comment) => {
    return comment.user == user && comment.date == date
      ? { ...comment, isEdit: true }
      : comment;
  });
  comments[id] = editedComments;
  return { ...comments };
};

export const editComments = (comments, editComment, id, user, date) => {
  console.log(id, date);
  if (!comments[id]) return { ...comments };

  const editedComments = comments[id].map((commentObj) => {
    return commentObj.user == user && commentObj.date == date
      ? {
          ...commentObj,
          comment: editComment,
          changedText: editComment,
          isEdit: false,
        }
      : comment;
  });
  comments[id] = editedComments;
  return { ...comments };
};

export function findDays(postDate) {
  const fullDate = new Date(postDate);
  const date = fullDate.getDate();
  const month = fullDate.getMonth();
  const year = fullDate.getFullYear();
  const hour = fullDate.getHours();
  const minutes = fullDate.getMinutes();
  const currentDate = new Date();
  if (currentDate.getFullYear() > year)
    return `${currentDate.getFullYear() - year} years ago`;
  if (currentDate.getMonth() > month)
    return `${currentDate.getMonth() - month} months ago`;
  if (currentDate.getDate() > date)
    return `${currentDate.getDate() - date} days ago`;
  if (currentDate.getHours() > hour)
    return `${currentDate.getHours() - hour} hours ago`;
  if (currentDate.getMinutes() > minutes)
    return `${currentDate.getMinutes() - minutes} minutes ago`;
  else return `Just now`;
}
