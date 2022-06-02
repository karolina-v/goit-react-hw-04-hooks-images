import React from 'react';
import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  image,
  alt,
  id,
  webformatURL,
  openModal
}) => {
  return (
    <li className={s.ImageGalleryItem}
      onClick={() => {
        openModal(image);
      }}
    >
      <img src={webformatURL} id={id} alt={alt} className={s.ImageGalleryItemImage} />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;