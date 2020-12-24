import "./ImageGalleryItemStyles.css";
import PropTypes from "prop-types";

const ImageGalleryItem = ({ id, url, tags, largeImgUrl }) => {
  return (
    <li className="ImageGalleryItem" key={id}>
      <img
        src={url}
        alt={tags}
        className="ImageGalleryItem-image"
        data-url={largeImgUrl}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  largeImgUrl: PropTypes.string.isRequired,
};
