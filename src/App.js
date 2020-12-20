import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";
import Modal from "./components/Modal";
export default class App extends Component {
  state = {
    query: "",
    showModal: false,
  };

  handleSearchSubmit = (searchQuery) => {
    this.setState({ query: searchQuery });
  };

  render() {
    const { showModal } = this.state;
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery query={this.state.query} />
        <ToastContainer autoClose={3000} />
        {showModal && <Modal />}
      </div>
    );
  }
}
