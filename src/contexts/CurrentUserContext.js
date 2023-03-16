import { createContext, useState } from 'react';

export const CurrentUserContext = createContext();

export const CurrentUserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({
    username: 'tickle122',
    name: 'Tom Tickle',
    avatar_url:
      'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
  });
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      {props.children}
    </CurrentUserContext.Provider>
  );
};
