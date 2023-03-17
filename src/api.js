import axios from 'axios';

const api = axios.create({ baseURL: 'https://nc-news-theo.onrender.com/api/' });

export const fetchArticles = (filters) => {
  const { topic, sort_by, order } = filters;

  const path = '/articles';
  const params = { limit: 10, sort_by, order };
  if (topic && topic !== 'Home') params.topic = topic.toLowerCase();

  return api.get(path, { params }).then(({ data: { articles } }) => articles);
};

export const fetchArticleByID = (article_id, username) => {
  const path = `/articles/${article_id}`;
  const params = { current_user: username };
  return api.get(path, { params }).then(({ data: { article } }) => {
    return article;
  });
};

export const fetchComments = (article_id) => {
  const path = `/articles/${article_id}/comments`;
  return api.get(path).then(({ data: { comments } }) => comments);
};

export const postComment = (article_id, comment) => {
  const path = `/articles/${article_id}/comments`;
  return api
    .post(path, comment)
    .then(({ data: { postedComment } }) => postedComment);
};

export const deleteComment = (comment_id) => {
  const path = `/comments/${comment_id}`;
  return api.delete(path).then(() => ({
    deletedCommentID: comment_id,
  }));
};

export const patchArticleVotes = (article_id, inc_votes) => {
  const path = `/articles/${article_id}`;
  return api
    .patch(path, { inc_votes })
    .then(({ data: { updatedArticle } }) => updatedArticle);
};

export const patchUserArticleVotes = (username, article_id, vote_value) => {
  const path = `/users/${username}`;
  return api
    .patch(path, { article_id, vote_value })
    .then(({ data: { updatedUser } }) => updatedUser);
};

export const fetchUser = (username) => {
  const path = `/users/${username}`;
  return api.get(path).then(({ data: { user } }) => user);
};

export const checkIfTopicValid = (topic) => {
  const path = `/topics`;
  return api
    .get(path)
    .then(
      ({ data: { topics } }) =>
        !!topics.find((fetchedTopic) => fetchedTopic.slug === topic)
    );
};
