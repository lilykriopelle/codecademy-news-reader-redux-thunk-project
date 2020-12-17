import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPreviews, selectAllPreviews } from './articlePreviewsSlice';
import { loadCurrentArticle } from '../currentArticle/currentArticleSlice';
import ArticleListItem from '../../components/ArticleListItem';

const ArticlePreviews = () => {
  const dispatch = useDispatch();
  const articlePreviews = useSelector(selectAllPreviews);
  const { isLoading } = useSelector((state) => state.articlePreviews);

  useEffect(() => {
    dispatch(loadAllPreviews());
  }, [dispatch]);

  if (isLoading) {
    return <div>loading state</div>;
  }

  return (
    <span className='articles-container'>
      {articlePreviews.map((article) => (
        <div onClick={(e) => dispatch(loadCurrentArticle(article.id))}>
          <ArticleListItem article={article}/>
        </div>
      ))}
    </span>
  );
};

export default ArticlePreviews;
