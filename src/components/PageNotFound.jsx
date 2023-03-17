import { Link } from 'react-router-dom';

function PageNotFound() {
  const badURL = window.location.href;

  return (
    <div className="page-not-found">
      <h1 className="page-not-found__404">404</h1>
      <h2 className="page-not-found__header">Page not found</h2>
      <p className="page-not-found__text">
        The URL {badURL} wasn't found on NC News. Check the address and try
        again, or click below to return to the homepage.
      </p>
      <Link to="/">
        <button className="page-not-found__button">Go home</button>
      </Link>
    </div>
  );
}

export default PageNotFound;
