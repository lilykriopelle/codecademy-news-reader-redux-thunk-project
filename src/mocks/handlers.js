import articlesData from "./articles.json";
import commentsData from "./comments.json";

const articles = articlesData;
const comments = commentsData;
const userComments = {};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function mockDelay(milliseconds) {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
}

export const getArticles = () =>
  articles.map(({ fullText, ...rest }) => ({ ...rest }));

export const getArticle = (articleToGetId) =>
  articles.find(({ id }) => id === articleToGetId);

export const getArticleComments = (articleId) => {
  const commentsForArticle = userComments[articleId] || [];

  return {
    articleId: articleId,
    comments: commentsData
      .filter((comment) => comment.articleId === articleId)
      .concat(commentsForArticle),
  };
};

export const postCommentForArticle = (articleId, comment) => {
  const commentResponse = {
    id: uuidv4(),
    articleId: articleId,
    text: comment,
  };

  if (userComments[articleId]) {
    userComments[articleId].push(commentResponse);
  } else {
    userComments[articleId] = [commentResponse];
  }

  return commentResponse;
};

export const deleteCommentForArticle = (articleId, commentId) => {
  const newComments = userComments[articleId].filter(
    (userComment) => userComment.id !== commentId
  );
  userComments[articleId] = [...newComments];
  return newComments;
};
