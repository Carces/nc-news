import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchArticleByID } from '../api';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArticleCard from './ArticleCard';
import CommentList from './CommentList';
import CommentBox from './CommentBox';

function ArticlePage() {
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { article_id } = useParams();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    fetchArticleByID(article_id)
      .then((article) => {
        console.log(article);
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

  return (
    <article className="article-page">
      {isLoading ? (
        loadingHTML
      ) : (
        <>
          <ArticleCard article={article} />
          <section className="article-page__comments">
            <CommentList article_id={article_id} />
          </section>
        </>
      )}
    </article>
  );
}

export default ArticlePage;
