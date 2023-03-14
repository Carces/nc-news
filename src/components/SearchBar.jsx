import { useState, useContext, useEffect } from 'react';
import { FiltersContext } from '../contexts/FiltersContext';
import SearchIcon from '@mui/icons-material/Search';

function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');
  const { filters, setFilters } = useContext(FiltersContext);

  function handleSubmit(event) {
    event.preventDefault();
    setFilters((currentFilters) => ({ ...currentFilters, search: searchTerm }));
  }

  useEffect(() => {
    if (!filters || !filters.search) setSearchTerm('');
  }, [filters]);

  return (
    <form className="search-bar">
      <input className="search-bar__input"></input>
      <button className="search-bar__button" onClick={handleSubmit}>
        <SearchIcon className="search-bar__icon" />
      </button>
    </form>
  );
}

export default SearchBar;
