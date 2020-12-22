import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";
import { createPortal } from "react-dom";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";

const modalRoot = document.querySelector("#modal-root");
export default class App extends Component {
  state = {
    query: "",

    showModal: false,
    modalContent: {
      url: "",
      alt: "",
    },
  };

  handleSearchSubmit = (searchQuery) => {
    this.setState({ query: searchQuery });
  };

  handleImageClick = (imgSrc, alt) => {
    this.setState({ modalContent: { url: imgSrc, alt } });
    this.toggleModal();
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { showModal, modalContent } = this.state;
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery
          query={this.state.query}
          onClick={this.handleImageClick}
        />
        <ToastContainer autoClose={3000} />
        {showModal &&
          createPortal(
            <Modal
              src={modalContent.url}
              alt={modalContent.alt}
              onClose={this.toggleModal}
            />,
            modalRoot
          )}
      </div>
    );
  }
}
