import React, { useState, useEffect } from 'react';
import './component/style.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
import GetApi from './component/Services';
import Searchbar from './component/Searchbar';
import ImageGallery from './component/ImageGallery';
import Button from './component/Button';
import Modal from './component/Modal';

const App = () => {
  const [images, setImages] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState('');

  useEffect(() => {
    fetchImages();
  }, [pageNumber]);

  function fetchImages() {
    if (searchQuery !== '') {
      setIsLoading(true);

      GetApi(searchQuery, pageNumber)
        .then(response => setImages([...images, ...response.data.hits]))
        .finally(() => setIsLoading(false));
    }
  }

  // Как сделать загрузку при первой странице?
  return (
    <div>
      <Searchbar
        onSubmitForm={e => {
          e.preventDefault();
          setImages([]);
          setPageNumber(1);
          if (pageNumber === 1) {
            setTimeout(fetchImages, 300);
          }
        }}
        onSearchInput={e => setSearchQuery(e.target.value)}
      />

      {isLoading && (
        <Loader
          className="loader"
          type="Puff"
          color="#00BFFF"
          height={300}
          width={300}
          timeout={3000} //3 secs
        />
      )}
      <ImageGallery
        imagesArr={images}
        onFullSize={largeImage => {
          setModalOpen(true);
          setLargeImage(largeImage);
        }}
      />

      {images.length > 0 && (
        <Button onNextPage={() => setPageNumber(pageNumber + 1)} />
      )}

      {modalOpen === true && (
        <Modal
          onCloseModal={() => setModalOpen(false)}
          largeImage={largeImage}
        />
      )}
    </div>
  );
};

export default App;
