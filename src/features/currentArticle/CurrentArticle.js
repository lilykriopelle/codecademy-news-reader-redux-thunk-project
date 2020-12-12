import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCurrentArticle } from "./currentArticleSlice";
import { loadCommentsForArticleId } from "../comments/commentsSlice";
import FullArticle from "../../components/FullArticle"
import Comment from "../../components/Comment"

const CurrentArticle = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.currentArticle.article);
  const commentsByArticleId = useSelector((state) => state.comments.byArticleId[article.id]);
  const { isLoading } = useSelector((state) => state.articlePreviews);

  useEffect(() => {
    dispatch(loadCommentsForArticleId(article.id));
  }, [dispatch, article.id]);

  if (isLoading) {
    return <div>loading state</div>;
  }

  return (
    <span className="current-article-container">
      <FullArticle article={article} />
      <section>
        <h2>Comments</h2>
        <ul>
          {commentsByArticleId && commentsByArticleId.map(c => <li><Comment comment={c}/></li>)}
        </ul>
      </section>
    </span>
  );
};

export default CurrentArticle;
