import axios from 'axios';

const api = axios.create({ baseURL: 'https://nc-news-theo.onrender.com/api/' });

export const fetchArticles = (filters) => {
  let path = '/articles';
  return api.get(path).then(({ data: { articles } }) => articles);
};

export const fetchArticleByID = (article_id) => {
  let path = `/articles/${article_id}`;
  return api.get(path).then(({ data: { article } }) => {
    return article;
  });
};

export const patchArticleVotes = (article_id, inc_votes) => {
  let path = `/articles/${article_id}`;
  return api
    .patch(path, { inc_votes })
    .then(({ data: { updatedArticle } }) => updatedArticle);
};
