import axios from 'axios';

const api = axios.create({ baseURL: 'https://nc-news-theo.onrender.com/api/' });

export const fetchArticles = (filters) => {
  const { sort_by, order } = filters;

  let path = '/articles?limit=10';
  if (sort_by) path += `&sort_by=${sort_by}`;
  if (order) path += `&order=${order}`;

  return api.get(path).then(({ data: { articles } }) => articles);
};

export const fetchArticleByID = (article_id, username) => {
  let path = `/articles/${article_id}?current_user=${username}`;
  return api.get(path).then(({ data: { article } }) => {
    return article;
  });
};

export const fetchComments = (article_id) => {
  let path = `/articles/${article_id}/comments`;
  return api.get(path).then(({ data: { comments } }) => comments);
};

export const postComment = (article_id, comment) => {
  console.log(comment);
  let path = `/articles/${article_id}/comments`;
  return api
    .post(path, comment)
    .then(({ data: { postedComment } }) => postedComment);
};

export const patchArticleVotes = (article_id, inc_votes) => {
  let path = `/articles/${article_id}`;
  return api
    .patch(path, { inc_votes })
    .then(({ data: { updatedArticle } }) => updatedArticle);
};

export const patchUserArticleVotes = (username, article_id, vote_value) => {
  let path = `/users/${username}`;
  return api
    .patch(path, { article_id, vote_value })
    .then(({ data: { updatedUser } }) => updatedUser);
};
