import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCommentsForArticleId } from "../comments/commentsSlice";
import { postCommentForArticleId } from "../comments/commentsSlice";
import FullArticle from "../../components/FullArticle"
import Comment from "../../components/Comment"

const CurrentArticle = () => {
  const dispatch = useDispatch();
  const article = useSelector((state) => state.currentArticle.article);
  const commentsByArticleId = useSelector((state) => state.comments.byArticleId[article.id]);
  const { isLoadingCurrentArticle } = useSelector((state) => state.currentArticle);
  const { isLoadingComments } = useSelector((state) => state.comments);
  const { createCommentIsPending } = useSelector((state) => state.comments);
  const [comment, setComment] = useState('');

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

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(postCommentForArticleId({articleId: article.id, comment: comment}))
    setComment('')
  }

  const loadingMessage = text => <div>Loading {text}</div>;

  return (
    <div className="current-article-container">
      <FullArticle article={article} />
      <section>
        <h2>Comments</h2>
        <ul>
          {isLoadingComments ? loadingMessage("Comments") : (commentsByArticleId || []).map(c => <li><Comment comment={c}/></li>)}
        </ul>
        <form onSubmit={handleSubmit}>
          <label for="comment">New Comment</label>
          <input id="comment" value={comment} onChange={e => setComment(e.currentTarget.value)} type="text"/>
          <button disabled={createCommentIsPending}>Publish</button>
        </form>
      </section>
    </div>
  );
};

export default CurrentArticle;
