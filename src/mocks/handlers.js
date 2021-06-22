import articlesData from "./articles.json";
import commentsData from "./comments.json";

const articles = articlesData;
const userComments = {};

function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export const getArticles = () =>
  new Promise((resolve) => {
    resolve(articles.map(({ fullText, ...rest }) => ({ ...rest })));
  });

export const getArticle = (articleToGetId) =>
  new Promise((resolve) => {
    resolve(articles.find(({ id }) => id === articleToGetId));
  });

export const getArticleComments = (articleId) => {
  return new Promise((resolve) => {
    const commentsForArticle = userComments[articleId] || [];
    resolve({
      articleId: articleId,
      comments: commentsData
        .filter((comment) => comment.articleId === articleId)
        .concat(commentsForArticle),
    });
  });
};

export const postCommentForArticle = (articleId, comment) => {
  return new Promise((resolve) => {
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

    resolve(commentResponse);
  });
};

export const deleteCommentForArticle = (articleId, commentId) => {
  return new Promise((resolve) => {
    const newComments = userComments[articleId].filter(
      (userComment) => userComment.id !== commentId
    );
    userComments[articleId] = [...newComments];

    resolve(newComments);
  });
};
