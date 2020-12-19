import "./ImageGalleryStyles.css";
import { Component } from "react";
import ImageGalleryItem from "../ImageGalleryItem";

export default class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const BASE_URL = "https://pixabay.com/api/";
    const API_KEY = "19028300-83b376d79bd6a99c9e2183deb";

    if (prevQuery !== nextQuery) {
      this.setState({ loading: true });

      fetch(
        `${BASE_URL}?image_type=photo&orientation=horizontal&q=${nextQuery}&page=${this.state.page}&per_page=12&key=${API_KEY}`
      )
        .then((res) => res.json())
        .then((res) => this.setState({ pictures: res.hits }))
        .finally(this.setState({ loading: false }));
    }
  }

  render() {
    const { pictures, loading } = this.state;
    return (
      <>
        {loading && <p className="loadingSpinner">Loading...</p>}
        {pictures && (
          <ul className="ImageGallery">
            {pictures.map((picture) => (
              <ImageGalleryItem
                id={picture.id}
                url={picture.webformatURL}
                tags={picture.tags}
              />
            ))}
          </ul>
        )}
      </>
    );
  }
}
