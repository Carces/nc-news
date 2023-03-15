import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

function CommentCard({ comment }) {
  const { comment_id, author, article_id, created_at, votes, body } = comment;

  const date = created_at.split('T')[0];

  return (
    <li className="comment-card">
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
