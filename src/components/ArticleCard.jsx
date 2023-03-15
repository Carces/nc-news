import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
  const {
    article_id,
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
      <Link to={`/articles/${article_id}`}>
        <h2 className="article-card__header">{title}</h2>
      </Link>
      <Link to={`/articles/${article_id}`}>
        <img
          className="article-card__img"
          src={article_img_url}
          alt={title}
        ></img>
      </Link>
    </li>
  );
}

export default ArticleCard;
