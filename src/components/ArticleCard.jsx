import { Link } from 'react-router-dom';
import { patchArticleVotes, patchUserArticleVotes } from '../api';
import { useState, useContext, useEffect } from 'react';

import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';

function ArticleCard({ article, setIsVotingError, inArticlePage }) {
  const [userVote, setUserVote] = useState(0);
  const {
    currentUser: { username },
  } = useContext(CurrentUserContext);

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

  function voteOnArticle(inc_votes) {
    setIsVotingError(false);

    let votesToUpdateArticle = inc_votes;
    if (userVote === inc_votes) {
      votesToUpdateArticle = inc_votes === -1 ? 1 : -1;
      setUserVote(0);
    } else if (userVote !== 0) {
      setUserVote(inc_votes);
      votesToUpdateArticle = inc_votes * 2;
    } else {
      setUserVote(inc_votes);
    }

    patchArticleVotes(article_id, votesToUpdateArticle).catch((err) => {
      console.log(err);
      setUserVote(0);
      setIsVotingError(true);
    });
  }

  return (
    <li
      className={
        inArticlePage
          ? 'article-card article-page__article-card'
          : 'article-card'
      }
    >
      <button className="info-bar__share-button">Share</button>
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
      <p className="info-bar">
        Posted in: <span className="info-bar__topic">{formattedTopic}</span> on{' '}
        <span className="info-bar__date">{date}</span> by{' '}
        <span className="info-bar__author">{author}</span>
      </p>
      <section className="article-card__interactions">
        <div className="article-card__votes">
          <button
            className={
              userVote < 0
                ? 'article-card__button voted'
                : 'article-card__button'
            }
            onClick={() => voteOnArticle(-1)}
          >
            {userVote < 0 ? <ThumbDownIcon /> : <ThumbDownOffAltIcon />}
          </button>
          {votes + userVote}
          <button
            className={
              userVote > 0
                ? 'article-card__button voted'
                : 'article-card__button'
            }
            onClick={() => voteOnArticle(1)}
          >
            {userVote > 0 ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
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
