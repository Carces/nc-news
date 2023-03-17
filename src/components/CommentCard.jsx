import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { deleteComment, fetchUser } from '../api';

import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Alert from '@mui/material/Alert';

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
  const { comment_id, author, created_at, votes, body } = comment;

  useEffect(() => {
    fetchUser(author).then((user) => {
      setAuthorAvatarURL(user.avatar_url);
    });
  }, [author]);

  const date = created_at.split('T')[0];

  const avatarHTML = (
    <img
      className="comment-card__avatar"
      src={authorAvatarURL}
      alt={`avatar for user ${author}`}
    />
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
  const commentErrorHTML = (
    <Alert severity="error" className="comment-card__error alert">
      Failed to comment {comment_id}
    </Alert>
  );

  return (
    <>
      {isError ? (
        commentErrorHTML
      ) : (
        <li className="comment-card">
          {authorAvatarURL ? avatarHTML : avatarPlaceholderHTML}

          {author === currentUser.author ? deleteButtonHTML : <></>}
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
      )}
    </>
  );
}

export default CommentCard;
