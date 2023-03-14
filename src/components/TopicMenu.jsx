import { useState, useContext, useEffect } from 'react';
import { FiltersContext } from '../contexts/FiltersContext';

function TopicMenu({
  currentTopic,
  setCurrentTopic,
  topicMenuShown,
  setTopicMenuShown,
}) {
  const { filters, setFilters } = useContext(FiltersContext);

  function changeTopic(event) {
    setFilters((currentFilters) => ({
      ...currentFilters,
      topic: event.target.value,
    }));
    setCurrentTopic(event.target.value);
    setTopicMenuShown(false);
  }

  return (
    <div className="topic-menu">
      {currentTopic === 'Home' ? null : (
        <button
          className="topic-menu__button"
          value="Home"
          onClick={changeTopic}
        >
          Home
        </button>
      )}

      {currentTopic === 'Cooking' ? null : (
        <button
          className="topic-menu__button"
          value="Cooking"
          onClick={changeTopic}
        >
          Cooking
        </button>
      )}

      {currentTopic === 'Coding' ? null : (
        <button
          className="topic-menu__button"
          value="Coding"
          onClick={changeTopic}
        >
          Coding
        </button>
      )}
    </div>
  );
}

export default TopicMenu;
