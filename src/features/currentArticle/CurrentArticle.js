import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadCommentsForArticleId } from '../comments/commentsSlice';
import {
  selectCurrentArticle,
  isLoadingCurrentArticle,
} from '../currentArticle/currentArticleSlice';
import FullArticle from '../../components/FullArticle';

const CurrentArticle = () => {
  const dispatch = useDispatch();
  const article = useSelector(selectCurrentArticle);
  const currentArticleIsLoading = useSelector(isLoadingCurrentArticle);

  useEffect(() => {
    if (article) dispatch(loadCommentsForArticleId(article.id));
  }, [dispatch, article]);

  if (currentArticleIsLoading) {
    return <div>Loading</div>;
  } else if (!article) {
    return null;
  }

  return <FullArticle article={article} />;
};

export default CurrentArticle;
