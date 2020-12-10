import React from "react";

export default function ArticleListItem({ article }) {
  return (
    <div key={article.id} className="article-container">
      <h3 className="article-title">{article.title}</h3>
      <div className="article-preview">{article.preview}</div>
    </div>
  );
}
