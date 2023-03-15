import { Link } from 'react-router-dom';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

function ArticleCard({ article }) {
  if (!article) return <></>;

  const {
    article_id,
    author,
    topic,
    title,
    created_at,
    votes,
    article_img_url,
    comment_count,
    saves,
  } = article;

  const date = created_at.split('T')[0];
  const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);

  return (
    <li className="article-card">
      <p className="article-card__info-bar">
        Posted in: <span className="info-bar__topic">{formattedTopic}</span> on{' '}
        <span className="info-bar__date">{date}</span> by{' '}
        <span className="info-bar__author">{author}</span>
        <button className="info-bar__share-button">Share</button>
      </p>

      <Link to={`/articles/${article_id}`}>
        <h2 className="article-card__header">{title}</h2>
      </Link>
      <Link to={`/articles/${article_id}`}>
        <img
          className="article-card__img"
          src={article_img_url}
          alt={title}
        ></img>{' '}
      </Link>
      <section className="article-card__interactions">
        <div className="article-card__votes">
          <button className="article-card__button">
            <ThumbDownOffAltIcon />
          </button>
          {votes}
          <button className="article-card__button">
            <ThumbUpOffAltIcon />
          </button>
        </div>
        <button className="article-card__button">
          <CommentOutlinedIcon />
          {comment_count}
        </button>
        <button className="article-card__button">
          <BookmarkAddOutlinedIcon />
          {saves || 0}
        </button>
      </section>
    </li>
  );
}

export default ArticleCard;
