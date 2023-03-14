import axios from 'axios';

const api = axios.create({ baseURL: 'https://nc-news-theo.onrender.com/api/' });

export const fetchArticles = (filters) => {
  let path = '/articles';
  return api.get(path).then(({ data: { articles } }) => articles);
};
