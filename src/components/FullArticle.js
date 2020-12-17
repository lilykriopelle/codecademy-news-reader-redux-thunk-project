import React from 'react';

export default function FullArticle({ article }) {
  return (
    <div key={article.id} className='current-article-container'>
      <h1 className='current-article-title'>{article.title}</h1>
      <div className='article-full-text'>{article.fullText}</div>
    </div>
  );
}
