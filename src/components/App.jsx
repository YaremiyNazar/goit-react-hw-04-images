import { useState, useEffect } from 'react';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchImages from 'api/api';
import Button from './Button/Button';
import ImageGallery from './ImageGallery/ImageGallery';
import Loader from './Loader/Loader';
import Modal from './Modal/Modal';
import Searchbar from './Searchbar/Searchbar';
import Notification from './Notification/Notificatiom';

const App = () => {
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [error, setError] = useState(null);
  const [tags, setTags] = useState('');
  const [largeImageURL, setLargeImageURL] = useState('');


  useEffect(() => {
    if (searchQuery === '') {
      return;
    }

    async function fetch() {
      try {
        setLoading(true);
        const imageData = await fetchImages(searchQuery, page);

        setTotalHits(imageData.totalHits);

        if (imageData.hits.length === 0) {
          Notify.failure('No results were found, please try something else.');
          return;
        }

        setArticles(state => [...state, ...imageData.hits]);
      } catch (error) {
        setError(error);
        Notify.failure(`Sorry something went wrong. ${error.message}`);
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, [searchQuery, page]);

  const handleLoadMore = () => {
    setPage(prevState => prevState + 1);
  };
  const handleFormSubmit = text => {
    setPage(1);
    setSearchQuery(text.trim());
    setArticles([]);
  };
  const handleImageClick = index => {
    toggleModal();

    setShowModal(true);
    setLargeImageURL(articles[index].largeImageURL);
    setTags(articles[index].tags);
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const imagesCount = articles.length;
  return (
    <>
      <div>
        <Searchbar onSubmit={handleFormSubmit} />
        {loading && <Loader />}

        {error && <p>{error.message}</p>}
        {imagesCount > 0 && (
          <ImageGallery articles={articles} onImageClick={handleImageClick} />
        )}
        {imagesCount > 0 && imagesCount !== totalHits && (
          <Button loadMore={handleLoadMore} />
        )}
        {imagesCount > 0 && imagesCount === totalHits && <Notification />}
      </div>

      <div>
        {showModal && (
          <Modal onClose={toggleModal}>
            {<img src={largeImageURL} alt={tags} />}
          </Modal>
        )}
      </div>
    </>
  );
};
export default App;
