const color = () => `hsl(${Math.floor(Math.random() * 100)}, 80%, 50%)`;

const updateComments = (comments, newComment, id, user) => {
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

const deleteComment = (comments, id, user, date) => {
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

const openInputToEdit = (comments, id, user, date) => {
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

const editComments = (comments, editComment, id, user, date) => {
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
      : commentObj;
  });
  comments[id] = editedComments;
  return { ...comments };
};
export default { updateComments, deleteComment, openInputToEdit, editComments };
