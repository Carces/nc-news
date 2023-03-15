import axios from 'axios';

const api = axios.create({ baseURL: 'https://nc-news-theo.onrender.com/api/' });

export const fetchArticles = (filters) => {
  let path = '/articles';
  return api.get(path).then(({ data: { articles } }) => articles);
};

export const fetchArticleByID = (article_id) => {
  let path = `/articles/${article_id}`;
  return api.get(path).then(({ data: { article } }) => {
    console.log(article, '<<< FROM FETCH ID');
    return article;
  });
};

export const fetchComments = (article_id) => {
  let path = `/articles/${article_id}/comments`;
  return api.get(path).then(({ data: { comments } }) => comments);
};

export const postComment = (article_id, comment) => {
  let path = `/articles/${article_id}/comments`;
  return api
    .post(path, comment)
    .then(({ data: { postedComment } }) => postedComment);
};
