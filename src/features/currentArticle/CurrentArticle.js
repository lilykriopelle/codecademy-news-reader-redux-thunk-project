import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentArticle } from "./currentArticleSlice";
import FullArticle from "../../components/FullArticle"

const CurrentArticle = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.currentArticle.article);
  const { isLoading } = useSelector((state) => state.articlePreviews);

  // useEffect(() => {
  //   dispatch(loadCurrentArticle(5));
  // }, [dispatch]);

  if (isLoading) {
    return <div>loading state</div>;
  }

  return (
    <span className="current-article-container">
      <FullArticle article={article} />
    </span>
  );
};

export default CurrentArticle;
