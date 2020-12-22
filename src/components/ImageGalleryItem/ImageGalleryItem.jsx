import "./ImageGalleryItemStyles.css";

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
