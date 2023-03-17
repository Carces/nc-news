import { Link } from 'react-router-dom';

function PageNotFound({
  currentTopic,
  setCurrentTopic,
  setIsInvalidTopic,
  setIsError,
}) {
  function resetTopic() {
    setCurrentTopic('News');
    setIsInvalidTopic(false);
    setIsError(false);
  }
  const badURL = window.location.href;
  const errorText = currentTopic
    ? `The topic page for ${currentTopic} doesn't exist. Have some ${currentTopic} news to share? Create a new topic page below!`
    : `The URL ${badURL} wasn't found on NC News. Check the address and try again, or click below to return to the homepage.`;

  return (
    <div className="page-not-found">
      <h1 className="page-not-found__404">404</h1>
      <h2 className="page-not-found__header">Page not found</h2>
      <p className="page-not-found__text">{errorText}</p>
      <Link to="/">
        <button className="page-not-found__button" onClick={resetTopic}>
          Homepage
        </button>
      </Link>
      {currentTopic && (
        <Link to="/new-topic">
          <button className="page-not-found__button" onClick={resetTopic}>
            Create topic
          </button>
        </Link>
      )}
    </div>
  );
}

export default PageNotFound;
