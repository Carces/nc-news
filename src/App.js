import './App.css';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';
import ArticlePage from './components/ArticlePage';
import { useState } from 'react';
import PageNotFound from './components/PageNotFound';

function App() {
  const [currentTopic, setCurrentTopic] = useState('News');

  return (
    <div className="App">
      <NavBar currentTopic={currentTopic} setCurrentTopic={setCurrentTopic} />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route
          path="/:topic"
          element={
            <ArticleList
              currentTopic={currentTopic}
              setCurrentTopic={setCurrentTopic}
            />
          }
        />
        <Route path="/articles/:article_id" element={<ArticlePage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
