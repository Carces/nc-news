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

  const date = created_at.split('T')[0];

  return (
    <li className="article-card">
      <p className="article-card__info-bar">
        Posted in: <span className="info-bar__topic">{topic}</span>
        {' | '}on: <span className="info-bar__date">{date}</span>
      </p>
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
