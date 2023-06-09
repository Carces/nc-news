import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { FiltersContext } from '../contexts/FiltersContext';
import { fetchArticles, checkIfTopicValid } from '../api';

import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import ArticleCard from './ArticleCard';
import SideBar from './SideBar';
import PageNotFound from './PageNotFound';

function ArticleList({ currentTopic, setCurrentTopic }) {
  const { filters, setFilters } = useContext(FiltersContext);
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isInvalidTopic, setIsInvalidTopic] = useState(false);
  const [isVotingError, setIsVotingError] = useState(false);
  const { topic } = useParams();

  useEffect(() => {
    setIsInvalidTopic(false);
    if (isError) {
      checkIfTopicValid(topic).then((isValid) => {
        setIsInvalidTopic(!isValid);
      });
    }
  }, [isError, setIsInvalidTopic, topic]);

  useEffect(() => {
    setFilters((currentFilters) => {
      return { ...currentFilters, topic };
    });
  }, [topic, setFilters]);

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
    <ArticleCard
      article={article}
      key={`article-list__index-${index}`}
      setIsVotingError={setIsVotingError}
      isVotingError={isVotingError}
    />
  ));
  const errorHTML = (
    <Alert severity="error" className="article-list__error alert">
      Failed to load articles
    </Alert>
  );
  const loadingHTML = (
    <CircularProgress className="article-list__loading loading" />
  );

  const votingErrorHTML = (
    <Alert severity="error" className="article-card__error alert">
      Vote failed. Please try again
    </Alert>
  );

  return isInvalidTopic ? (
    <PageNotFound
      currentTopic={currentTopic}
      setCurrentTopic={setCurrentTopic}
      setIsInvalidTopic={setIsInvalidTopic}
      setIsError={setIsError}
    />
  ) : (
    <>
      <SideBar />
      <ul className="article-list page-content">
        {isVotingError && votingErrorHTML}
        {isError ? errorHTML : isLoading ? loadingHTML : articleCards}
      </ul>
    </>
  );
}

export default ArticleList;
