import { useState, useContext } from 'react';
import { postComment } from '../api';

import { CurrentUserContext } from '../contexts/CurrentUserContext';

function CommentBox({ article_id, setNewUserComment }) {
  function handleSubmit(event) {
    const timestamp = new Date().toJSON();
    event.preventDefault();
    setIsError(false);
    if (!commentText) return setIsError(true);

    setNewUserComment({
      body: commentText,
      author: username,
      votes: 0,
      created_at: timestamp,
    });

    setCommentText('');

    postComment(article_id, {
      username: username,
      body: commentText,
    }).catch((err) => {
      console.log(err);
      setIsError(true);
    });
  }

  const [commentText, setCommentText] = useState('');
  const [isError, setIsError] = useState(false);
  const { currentUser } = useContext(CurrentUserContext);
  const { username } = currentUser;

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <h4 className="comment-box__header">Comment as {username}</h4>
      <textarea
        className="comment-box__input"
        value={commentText}
        required
        onChange={(event) => setCommentText(event.target.value)}
      ></textarea>
      <button
        className={
          !commentText || isError
            ? 'comment-box__button comment-box__button--disabled'
            : 'comment-box__button'
        }
        disabled={!commentText || isError ? true : ''}
      >
        Add Comment
      </button>
    </form>
  );
}

export default CommentBox;
