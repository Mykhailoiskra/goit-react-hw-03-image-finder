import "./ImageGalleryStyles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Component } from "react";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import ImageGalleryItem from "../ImageGalleryItem";
import Button from "../Button";
import API from "../../services/pixabay-api";

export default class ImageGallery extends Component {
  state = {
    pictures: [],
    page: 1,
    error: null,
    status: "idle",
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const currentQuery = this.props.query;

    if (prevQuery !== currentQuery) {
      this.setState({ status: "pending", page: 1 });

      API.fetchPictures(currentQuery, this.state.page)
        .then((res) =>
          this.setState({
            pictures: res.hits,
            status: "resolved",
          })
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    } else if (prevState.page !== this.state.page) {
      API.fetchPictures(this.props.query, this.state.page)
        .then((res) =>
          this.setState(({ pictures }) => ({
            pictures: [...pictures, ...res.hits],
            status: "resolved",
          }))
        )
        .catch((error) => this.setState({ error, status: "rejected" }));
    }

    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }
  handleImageClick = (evt) => {
    if (evt.target.tagName === "IMG") {
      this.props.onClick(evt.target.dataset.url, evt.target.alt);
    }
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  render() {
    const { pictures, error, status } = this.state;

    if (status === "idle") {
      return <div>Let's find some nice pictures!</div>;
    }

    if (status === "pending") {
      return (
        <Loader
          type="ThreeDots"
          color="#00BFFF"
          height={120}
          width={120}
          style={{ textAlign: "center" }}
        />
      );
    }
    if (status === "rejected") {
      return toast.error(error);
    }

    if (status === "resolved" && pictures.length !== 0) {
      return (
        <>
          <ul className="ImageGallery" onClick={this.handleImageClick}>
            {pictures.map((picture) => (
              <ImageGalleryItem
                id={picture.id}
                url={picture.webformatURL}
                tags={picture.tags}
                largeImgUrl={picture.largeImageURL}
              />
            ))}
          </ul>
          <Button onClick={this.handleLoadMore} />
        </>
      );
    } else {
      return <div>We didn't find such picture...</div>;
    }
  }
}
