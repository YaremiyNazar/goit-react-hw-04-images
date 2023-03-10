
import PropTypes from 'prop-types';
import css from '../ImageGalleryItem/ImageGalleryItem.module.css';

const ImageGalleryItem = ({ tags, index, imgURL , onImageClick }) => {
  return (
    <li className={css.gallery__item}>
      <img
        className={css.gallery__image}
        alt={tags}
        src={imgURL}
        onClick={() => onImageClick(index)}
      />
      </li>
)};
ImageGalleryItem.propTypes = {
  onImageClick: PropTypes.func,
  imgURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
export default ImageGalleryItem;

