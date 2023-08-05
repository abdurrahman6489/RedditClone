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
