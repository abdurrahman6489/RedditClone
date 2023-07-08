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
      array.slice().sort((post1, post2) => post2.time - post1.time),
  },

  Top: {
    label: "Top",
    color: "info",
    filterThePosts: (array) =>
      array.slice().sort((post1, post2) => post2.upvote - post1.upvote),
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

export const chipProps = Object.keys(filterObject)
  .filter((elem, index) => index <= 4)
  .map((chipProp) => {
    const { label, color } = filterObject[chipProp];
    return { label, color };
  });

export const selectTagProps = Object.keys(filterObject)
  .filter((elem, index) => index > 4)
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
            upvote: !post.voteStatus
              ? action.payload.upvote + 1
              : action.payload.upvote,
            voteStatus: true,
          }
        : post
    ),
  changeDownvote: (posts, action) =>
    posts.map((post) =>
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
