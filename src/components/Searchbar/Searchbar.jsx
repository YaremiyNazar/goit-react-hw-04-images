import { useState} from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { MdLocationSearching } from 'react-icons/md';
import PropTypes from 'prop-types';
import css from '../Searchbar/Searchbar.module.css';



const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleChange = event => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const formSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') {
      Notify.failure('Sorry, no matching your search query. Please try again.');
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={formSubmit}>
        <button type="submit" className={css.button}>
          <span className={css.label}>Search</span>

          <MdLocationSearching size={30} fill={'orange'} />
        </button>

        <input
          className={css.input}
          name="query"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleChange}

        />
      </form>
    </header>
  );
};
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default Searchbar;
