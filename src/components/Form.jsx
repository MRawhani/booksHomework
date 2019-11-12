import React, { Component } from "react";
import * as axiosService from "./axiosservice";

import { toast } from "react-toastify";

export default class Form extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        title: "",
        author: "",
        publisher: ""
      },
      success: false
    };
  }
  async componentDidMount() {
    const bookId = this.props.match.params.id;
    if (bookId === "new") {
      return;
    }
    axiosService.getBookById(bookId).then(data => {
      debugger;
      this.setState({
        data
      });
    });
  }
  onChange = e => {
    const data = { ...this.state.data };

    data[e.currentTarget.name] = e.currentTarget.value;

    this.setState({ data });
  };
  onSuccess = () => {
    toast.success("Success: Redirecting...");
    setTimeout(() => {
      window.location = "/";
    }, 1000);
  };
  onSubmit = e => {
    e.preventDefault();
    const bookData = { ...this.state.data };
    const bookId = this.props.match.params.id;

    debugger;
    if (bookId !== "new") {
      axiosService
        .updateBook(bookData, bookId)
        .then(e => {
          this.onSuccess();
        })
        .catch(err => {
          toast.error("Error ");
        });
    } else {
      axiosService
        .createBook(bookData)
        .then(e => {
          this.onSuccess();
        })
        .catch(err => {
          toast.error("Error ");
        });
    }
  };
  render() {
    const {
      data: { title, author, publisher },
      success
    } = this.state;
    return (
      <section>
        <div className="has-form">
          <h2>Data of Books</h2>
          {success && <p className="message">Save success</p>}
          <form onSubmit={this.onSubmit}>
            <label>
              Title
              <input
                type="text"
                name="title"
                required
                value={title}
                onChange={this.onChange}
              />
            </label>
            <br></br>
            <label>
              Author
              <input
                type="text"
                name="author"
                required
                value={author}
                onChange={this.onChange}
              />
            </label>
            <br></br>
            <label>
              Publisher
              <input
                type="text"
                name="publisher"
                required
                value={publisher}
                onChange={this.onChange}
              />
            </label>
            <br></br>
            <input type="submit" name="save" value="Save" className="link" />
          </form>
        </div>
      </section>
    );
  }
}
