import "./ImageGalleryStyles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Component } from "react";
import Loader from "react-loader-spinner";
import { toast } from "react-toastify";
import ImageGalleryItem from "../ImageGalleryItem";
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
    const nextQuery = this.props.query;

    if (prevQuery !== nextQuery) {
      this.setState({ status: "pending" });

      API.fetchPictures(nextQuery, this.state.page)
        .then((res) =>
          this.setState({ pictures: res.hits, status: "resolved" })
        )
        .catch((error) => this.setState({ error, status: "rejected" }))
        .finally(this.setState({ loading: false }));
    }
  }

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
        <ul className="ImageGallery">
          {pictures.map((picture) => (
            <ImageGalleryItem
              id={picture.id}
              url={picture.webformatURL}
              tags={picture.tags}
            />
          ))}
        </ul>
      );
    } else {
      return <div>We didn't find such picture...</div>;
    }
  }
}
