import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import s from './App.module.css';

export function App () {
  const [inputValue, setInputValue] = useState('');

  return (
    <div className={s.App}>
      <Searchbar onNameSubmit={setInputValue} />

      <ImageGallery inputValue={inputValue}></ImageGallery>

      <ToastContainer autoClose={3000} />
    </div>
  );
}