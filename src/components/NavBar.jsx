// import { useState, useContext, useEffect } from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// import { CurrentUserContext } from '../contexts/CurrentUserContext';
import logo from '../img/logo.png';

import SearchBar from './SearchBar';
import TopicMenu from './TopicMenu';

function NavBar() {
  // function toggleUserMenu() {
  //   setUserMenuShown(!userMenuShown);
  // }
  // function closeUserMenu(event) {
  //   if (!event.currentTarget.contains(event.relatedTarget)) {
  //     setUserMenuShown(false);
  //   }
  // }
  function toggleTopicMenu() {
    setTopicMenuShown(!topicMenuShown);
  }

  function closeTopicMenu(event) {
    if (
      !event.relatedTarget ||
      !event.relatedTarget.className === 'topic-menu__button'
    ) {
      setTopicMenuShown(false);
    }
  }

  function resetTopic() {
    setCurrentTopic('News');
  }

  const [currentTopic, setCurrentTopic] = useState('News');
  // const [userMenuShown, setUserMenuShown] = useState(false);
  const [topicMenuShown, setTopicMenuShown] = useState(false);
  // const { currentUser } = useContext(CurrentUserContext);
  const URLSections = window.location.href.split('/');
  const topic = URLSections[URLSections.length - 1];
  // const mobileScreenMatcher = window.matchMedia('(max-width: 500px)');
  //   console.log(mobileScreenMatcher.matches);

  useEffect(() => {
    if (topic) {
      const formattedTopic = topic.charAt(0).toUpperCase() + topic.slice(1);
      setCurrentTopic(formattedTopic);
    } else setCurrentTopic('News');
  }, [topic]);

  return (
    <nav className="nav-bar">
      <Link to="/">
        <img
          src={logo}
          alt="NC News logo"
          className="nav-bar__main-logo"
          aria-label="Logo - go to home page"
          onClick={resetTopic}
        />
      </Link>
      <button
        className="nav-bar__button nav-bar__topic-button"
        onClick={toggleTopicMenu}
        onBlur={closeTopicMenu}
      >
        <p className="nav-bar__current-topic">{currentTopic}</p>
      </button>
      {topicMenuShown ? (
        <TopicMenu
          currentTopic={currentTopic}
          setCurrentTopic={setCurrentTopic}
          topicMenuShown={topicMenuShown}
          setTopicMenuShown={setTopicMenuShown}
        />
      ) : null}
      <SearchBar className="search-bar" />
    </nav>
  );
}

export default NavBar;
