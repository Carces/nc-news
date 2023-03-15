import { useEffect, useState } from 'react';
import { fetchComments } from '../api';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import CommentCard from './CommentCard';

function CommentList({ article_id }) {
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    fetchComments(article_id)
      .then((fetchedComments) => {
        setComments(fetchedComments);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [article_id]);

  const commentCards = comments.map((comment, index) => (
    <CommentCard comment={comment} key={`comment-list__index-${index}`} />
  ));
  const errorHTML = (
    <Alert severity="error" className="comment-list__error alert">
      Failed to load comments
    </Alert>
  );
  const loadingHTML = <CircularProgress className="loading" />;

  return (
    <div className="comment-list">
      {isError ? errorHTML : isLoading ? loadingHTML : commentCards}
    </div>
  );
}

export default CommentList;
