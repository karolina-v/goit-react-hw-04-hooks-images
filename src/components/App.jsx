import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import s from './App.module.css';

export class App extends React.Component {
  state = {
    inputValue: '',
    searchbar: '',
  };

  
  handleFormSubmit = inputValue => {
    this.setState({ inputValue });
  };

  render() {
    const { inputValue } = this.state;
    return (
      <div className={s.App}>
        <Searchbar onNameSubmit={this.handleFormSubmit} />

        <ImageGallery inputValue={inputValue}></ImageGallery>

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

// export default App;