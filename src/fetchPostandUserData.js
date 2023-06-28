export const fetchData = async (POST_URL, USER_URL) => {
  const response = await fetch(POST_URL);
  const data = await response.json();

  const userResponse = await fetch(USER_URL);
  const userData = await userResponse.json();
  const usersData = userData.users;
  const newPosts = data.photos.map((photo, index) => ({
    ...photo,
    upvote: generateReaction(200, 300),
    downvote: generateReaction(100, 200),
    voteStatus: false,
    username: userData.users[index].firstName,
  }));
  return { newPosts, usersData };
};
