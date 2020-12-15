import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsForArticleId } from "../comments/commentsSlice";
import FullArticle from "../../components/FullArticle"

const CurrentArticle = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.currentArticle.article);
  const { isLoadingCurrentArticle } = useSelector((state) => state.currentArticle);

  useEffect(() => {
    dispatch(loadCommentsForArticleId(article.id));
  }, [dispatch, article.id]);

  if (isLoadingCurrentArticle) {
    return <div>loading state</div>;
  }
  else if (!article.id) {
    return (
      <div className="current-article-container">
        <h1>No article selected.</h1>
      </div>
    );
  }

  return (
    <div className="current-article-container">
      <FullArticle article={article} />
    </div>
  );
};

export default CurrentArticle;
