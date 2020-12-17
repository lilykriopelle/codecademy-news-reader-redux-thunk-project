import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadAllPreviews, selectAllPreviews, isLoading } from './articlePreviewsSlice';
import { loadCurrentArticle } from '../currentArticle/currentArticleSlice';
import ArticleListItem from '../../components/ArticleListItem';

const ArticlePreviews = () => {
  const dispatch = useDispatch();
  const articlePreviews = useSelector(selectAllPreviews);
  const isLoadingPreviews = useSelector(isLoading);

  useEffect(() => {
    dispatch(loadAllPreviews());
  }, [dispatch]);

  if (isLoadingPreviews) {
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
