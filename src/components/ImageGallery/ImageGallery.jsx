import React, { Component } from 'react';
import imagesAPI from '../../services/images-api';
import { toast } from 'react-toastify';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import Button from '../Button';
import Modal from '../Modal';
import { Spinner } from '../Loader';


class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    error: null,
    status: 'idle',
    showImage: null,
    totalHits: null,
    loadMore: false,
  };

  
  componentDidUpdate(prevProps, prevState) {
    const prevValue = prevProps.inputValue;
    const nextValue = this.props.inputValue;


    const { page, totalHits } = this.state;

    if (prevValue !== nextValue) {
      this.setState({
        status: 'pending',
        page: 1,
        images: [],
        loadMore: false,
      });

      imagesAPI
        .fetchImages(nextValue, page)
        .then(data => {
            this.setState({ totalHits: data.totalHits });
            return data.hits;
          })
          .then(images => {
            if (images.length === 0) {
              this.setState({
                images,
                status: 'idle',
              });
              toast.error('По вашему запросу ничего не найдено!');
              return;
            }
            this.setState({ images, status: 'resolved', loadMore: true });
          })
          .catch(error => this.setState({ error, status: 'rejected' }));
    }

     if (page !== prevState.page && prevValue === nextValue) {
       this.setState({ status: 'pending' });
       
       if (totalHits === 0 && totalHits/12 <= page) {
        this.setState({ loadMore: false });
      }

      imagesAPI
        .fetchImages(nextValue, page)
        .then(data => data.hits)
          .then(newImages =>
            this.setState(prevState => ({
              images: [...prevState.images, ...newImages],
              status: 'resolved',
            })),
          )
          .catch(error => this.setState({ error, status: 'rejected' }));
      }

      window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth',
              });
  }

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

   closeModal = () => {
    this.setState({ showImage: null });
  };
  
   openModal = image => {
    this.setState({ showImage: image });
  };
  

  render() {
    const { status, images, showImage, loadMore, error } = this.state;

    if (status === 'pending') {
      return <Spinner />;
    }

    if (status === 'resolved') {
      return (
        <ul className={s.ImageGallery}>
          {images.map((img, idx) => {
            return (
              <ImageGalleryItem
                image={img}
                key={idx}
                alt={img.tags}
                id={img.id}
                webformatURL={img.webformatURL}
                openModal={this.openModal}
              />
            );
          })}

          {loadMore &&
            <Button onClick={this.loadMore} />
          }
    
          {showImage && (
            <Modal
              src={showImage.largeImageURL}
              alt={showImage.tags}
              onClose={this.closeModal}
            />
          )}
        </ul>
      );
    }

    if (status === 'rejected') {
      return (
        <div>
          <p>{error.message}</p>
        </div>
      )
    }
  }
}

export default ImageGallery;