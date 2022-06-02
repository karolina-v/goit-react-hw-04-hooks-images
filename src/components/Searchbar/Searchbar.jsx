import React from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends React.Component {
  state = {
    searchbar: '',
  };

  handleInputChange = event => {
    this.setState({ searchbar: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    if (this.state.searchbar.trim() === '') {
      toast.error('Введите ключевое слово!');
      return;
    }
    this.props.onNameSubmit(this.state.searchbar);
    this.setState({ searchbar: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchbar}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}

export default Searchbar;