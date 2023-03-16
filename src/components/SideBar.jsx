import { useState, useContext } from 'react';
import { FiltersContext } from '../contexts/FiltersContext';

import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function SideBar() {
  function toggleSortOrder() {
    setSortOrder(sortOrder === 'Descending' ? 'Ascending' : 'Descending');
  }

  const [sortBy, setSortBy] = useState('Votes');
  const [sortOrder, setSortOrder] = useState('Descending');
  const { filters, setFilters } = useContext(FiltersContext);

  return (
    <form className="side-bar">
      <section className="side-bar__sort-by side-bar__section">
        <label htmlFor="side-bar__sort-by-select" className="side-bar__label">
          Sort by
        </label>
        <select
          id="side-bar__sort-by-select"
          className="side-bar__input side-bar__select"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="Votes">Votes</option>
          <option value="Date">Date</option>
          <option value="Comments">Comments</option>
        </select>
      </section>
      <section className="side-bar__sort-order side-bar__section">
        <label
          htmlFor="side-bar__sort-order-toggle"
          className="side-bar__label"
        >
          {sortOrder}
        </label>
        <button
          type="button"
          id="side-bar__sort-order-toggle"
          className="side-bar__input side-bar__button"
          onClick={toggleSortOrder}
        >
          {sortOrder === 'Descending' ? (
            <ArrowDownwardIcon className="side-bar__icon" />
          ) : (
            <ArrowUpwardIcon className="side-bar__icon" />
          )}
        </button>
      </section>
    </form>
  );
}

export default SideBar;
