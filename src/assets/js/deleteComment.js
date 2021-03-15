import axios from "axios";

const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");
const deleteCommentDOMS = document.querySelectorAll(".js-delete-comment");

const diminishNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
};

const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
};

const deleteComment = (comment) => {
  comment.parentNode.removeChild(comment);
};

const handleDeleteComment = async (e) => {
  const videoId = window.location.href.split("/videos/")[1];
  const comment = e.target.parentNode;
  const commentId = e.target.dataset.commentid;

  comment.style.display = "none";
  diminishNumber();

  const response = await axios({
    url: `/api/${videoId}/delete-comment`,
    method: "POST",
    data: {
      commentId,
    },
  });
  if (response.status === 200) {
    deleteComment(comment);
  } else {
    console.log("error", response);
    comment.style.display = "list-item";
    increaseNumber();
  }
};

function init() {
  Array.from(deleteCommentDOMS).forEach(function (currentComment) {
    currentComment.addEventListener("click", handleDeleteComment);
  });
}

if (commentList) {
  init();
}
