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
  .filter((chipProp) => {
    const { label } = filterObject[chipProp];
    return label !== "Search";
  })
  .map((chipProp) => {
    const { label, color } = filterObject[chipProp];
    let status = label == "Best" ? true : false;
    return { label, color, status };
  });

export const selectTagProps = Object.keys(filterObject)
  .filter((elem, index) => index >= filterObjectLength - 2)
  .map((selectProp) => {
    const { label } = filterObject[selectProp];
    return { value: label, content: label };
  });

export const signalProps = { warning: "warning", success: "success" };

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
