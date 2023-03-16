import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleByID } from '../api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArticleCard from './ArticleCard';

function ArticlePage() {
  const [article, setArticle] = useState({
    article_id: 0,
    author: '',
    topic: '',
    title: '',
    created_at: '',
    votes: 0,
    article_img_url: '',
    comment_count: 0,
    saves: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isVotingError, setIsVotingError] = useState(false);
  const {
    currentUser: { username },
  } = useContext(CurrentUserContext);
  const { article_id } = useParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    fetchArticleByID(article_id, username)
      .then((article) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [article_id]);

  const loadingHTML = (
    <CircularProgress className="article-page__loading loading" />
  );

  const errorHTML = (
    <Alert severity="error" className="article-page__error alert">
      Failed to load article
    </Alert>
  );

  const votingErrorHTML = (
    <Alert severity="error" className="article-card__error alert">
      Vote failed. Please try again
    </Alert>
  );

  return (
    <article className="article-page">
      {isVotingError && votingErrorHTML}
      {isError && errorHTML}
      {isLoading ? (
        loadingHTML
      ) : (
        <>
          <ArticleCard
            article={article}
            setIsVotingError={setIsVotingError}
            isVotingError={isVotingError}
          />
          <section className="article-page__comments">COMMENTS</section>
        </>
      )}
    </article>
  );
}

export default ArticlePage;
