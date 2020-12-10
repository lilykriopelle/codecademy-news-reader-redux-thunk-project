import React from "react";

export default function FullArticle({ article }) {
  return (
    <div key={article.id} className="current-article-container">
      <h3 className="current-article-title">{article.title}</h3>
      <div className="article-full-text">{article.fullText}</div>
    </div>
  );
}
