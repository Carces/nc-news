// import { useState, useContext, useEffect } from 'react';

function ArticleCard({ article }) {
  const {
    author,
    topic,
    title,
    created_at,
    votes,
    article_img_url,
    comment_count,
  } = article;

  return (
    <li className="article-card">
      <h2 className="article-card__header">{title}</h2>
      <img
        className="article-card__img"
        src={article_img_url}
        alt={title}
      ></img>
    </li>
  );
}

export default ArticleCard;
