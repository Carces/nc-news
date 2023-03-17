import { useContext, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { deleteComment } from '../api';

import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function CommentCard({ comment, setComments, index }) {
  function handelDeleteComment() {
    setIsError(false);
    setComments((currentComments) => {
      const updatedComments = [...currentComments];
      updatedComments.splice(index, 1);
      return updatedComments;
    });
    deleteComment(comment_id).catch((err) => {
      console.log(err);
      setIsError(true);
    });
  }

  const [authorAvatarURL, setAuthorAvatarURL] = useState('');
  const [isError, setIsError] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const { comment_id, author, article_id, created_at, votes, body } = comment;

  const date = created_at.split('T')[0];

  const avatarHTML = (
    <img className="comment-card__avatar" src={authorAvatarURL} />
  );
  const avatarPlaceholderHTML = <AccountCircleIcon />;
  const deleteButtonHTML = (
    <button
      className="comment-card__button comment-card__delete-button"
      onClick={handelDeleteComment}
    >
      Delete
    </button>
  );

  return (
    <li className="comment-card">
      {authorAvatarURL ? avatarHTML : avatarPlaceholderHTML}

      {author === currentUser.username ? deleteButtonHTML : <></>}
      <p className="comment-card__info-bar">
        Posted on: <span className="info-bar__date">{date}</span>
      </p>
      <h3 className="comment-card__author">{author}</h3>
      <p className="comment-card__body">{body}</p>
      <div className="comment-card__votes">
        <button className="comment-card__button">
          <ThumbDownOffAltIcon />
        </button>
        {votes}
        <button className="comment-card__button">
          <ThumbUpOffAltIcon />
        </button>
      </div>
    </li>
  );
}

export default CommentCard;
