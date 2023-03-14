import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import NavBar from './components/NavBar';
import ArticleList from './components/ArticleList';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<ArticleList />} />
      </Routes>
    </div>
  );
}

export default App;
