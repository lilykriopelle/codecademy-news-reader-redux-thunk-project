import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
    // TO DO – dispatch asynchronous action to fetch current article data here
  }, [dispatch, article]);

  if (currentArticleIsLoading) {
    return <div>Loading</div>;
  } else if (!article) {
    return null;
  }

  return <FullArticle article={article} />;
};

export default CurrentArticle;
