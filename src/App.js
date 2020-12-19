import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { Component } from "react";
import { ToastContainer } from "react-toastify";
import Searchbar from "./components/Searchbar";
import ImageGallery from "./components/ImageGallery";

export default class App extends Component {
  state = {
    query: "",
  };

  handleSearchSubmit = (searchQuery) => {
    this.setState({ query: searchQuery });
  };

  render() {
    return (
      <div className="container">
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery query={this.state.query} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
