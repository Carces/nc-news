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

function ArticleCard({ article, setIsVotingError }) {
  const [userVote, setUserVote] = useState(0);
  const [tempUserVote, setTempUserVote] = useState(0);
  const {
    currentUser: { username },
  } = useContext(CurrentUserContext);

  // if (!article) return <></>;
  const {
    article_id,
    author,
    topic,
    title,
    created_at,
    votes,
    article_img_url,
    comment_count,
    current_user_voted,
    saves,
  } = article;
  const date = created_at.split('T')[0];
  const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
  console.log(tempUserVote, 'TEMP FROM START');
  console.log(votes, 'VOTES');

  useEffect(() => {
    const userVoteFromDB = current_user_voted || 0;
    setUserVote(userVoteFromDB);
    setTempUserVote(userVoteFromDB);
    // console.log(
    //   userVoteFromDB,
    //   '<<<< DB',
    //   userVote,
    //   '<<<< USER VOTE B4 RE-REND'
    // );
  }, [article]);

  function voteOnArticle(inc_votes) {
    setIsVotingError(false);

    let votesToUpdateArticle = inc_votes;
    if (userVote === inc_votes) {
      // console.log('MATCH');
      votesToUpdateArticle = inc_votes === -1 ? 1 : -1;
      setUserVote(0);
      setTempUserVote(0);
    } else if (userVote !== 0) {
      console.log(userVote, '<< ELSE IF');
      setUserVote(inc_votes * 2);
      setTempUserVote(inc_votes);
      votesToUpdateArticle = inc_votes * 2;
    } else {
      setUserVote(inc_votes);
      setTempUserVote(inc_votes);
    }

    // setTempUserVote(votesToUpdateArticle);
    console.log(tempUserVote, votesToUpdateArticle);

    // console.log(inc_votes, '<<inc', votesToUpdateArticle, '<<art');
    patchArticleVotes(article_id, votesToUpdateArticle).catch((err) => {
      console.log(err);
      setUserVote(0);
      setIsVotingError(true);
    });
    patchUserArticleVotes(username, article_id, inc_votes).catch((err) => {
      console.log(err);
      // setUserVote(0);
      setIsVotingError(true);
    });
  }

  return (
    <li className="article-card">
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
          {votes + tempUserVote}
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
