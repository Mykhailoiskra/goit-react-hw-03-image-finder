import "./ImageGalleryItemStyles.css";

const ImageGalleryItem = ({ id, url, tags }) => {
  return (
    <li className="ImageGalleryItem" key={id}>
      <img src={url} alt={tags} className="ImageGalleryItem-image" />
    </li>
  );
};

export default ImageGalleryItem;
