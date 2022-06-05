import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

function Searchbar({ onNameSubmit }) {

  const [searchbar, setSearchbar] = useState('');

  const handleInputChange = e => {
    setSearchbar(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchbar.trim() === '') {
      toast.error('Введите ключевое слово!');
      return;
    }
    
    onNameSubmit(searchbar);
    setSearchbar('');
  };

  return (
    <header className={s.Searchbar}>
      <form onSubmit={handleSubmit} className={s.SearchForm}>
        <button type="submit" className={s.SearchFormButton}>
          <span className={s.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={s.SearchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchbar}
          onChange={handleInputChange}
        />
      </form>
    </header>
  ); 
}

Searchbar.propTypes = {
  onNameSubmit: PropTypes.func.isRequired
}

export default Searchbar;