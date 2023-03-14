import { useState, useContext, useEffect } from 'react';

import { FiltersContext } from '../contexts/FiltersContext';
import { fetchArticles } from '../api';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArticleCard from './ArticleCard';

function ArticleList() {
  const { filters, setFilters } = useContext(FiltersContext);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    fetchArticles(filters)
      .then((articles) => {
        setArticles(articles);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      });
  }, [filters]);

  const articleCards = articles.map((article, index) => (
    <ArticleCard article={article} key={`article-list__index-${index}`} />
  ));
  const errorHTML = (
    <Alert severity="error" className="article-list__error alert">
      Failed to load articles
    </Alert>
  );
  const loadingHTML = (
    <CircularProgress className="article-list__loading loading" />
  );

  return (
    <ul className="article-list page-content">
      {isError ? errorHTML : isLoading ? loadingHTML : articleCards}
    </ul>
  );
}

export default ArticleList;
