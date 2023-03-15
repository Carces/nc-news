import { useState } from 'react';
import { postComment } from '../api';

function CommentBox() {
  function handleSubmit(event) {
    event.preventDefault();
    // postComment()
    // comment format:
    // comment: {
    //       "comment_id": 19,
    //       "body": "Loved it, great article!",
    //       "article_id": 2,
    //       "author": "butter_bridge",
    // }
  }

  const [commentText, setCommentText] = useState('');

  return (
    <form className="comment-box" onSubmit={handleSubmit}>
      <textarea
        className="comment-box__input"
        placeholder="Add a comment..."
        value={commentText}
        onChange={(event) => setCommentText(event.target.value)}
      ></textarea>
      <button className="comment-box__button">Add Comment</button>
    </form>
  );
}

export default CommentBox;
