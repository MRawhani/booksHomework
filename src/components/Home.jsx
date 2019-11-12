import React, { Component } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";
import {toast} from 'react-toastify'
import config from "./config/keys";
import * as actions from './axiosservice'

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      books: [],
      deleted:false
    };
  }
  async componentDidMount() {
    const apiUrl = config() ;
    try {
      debugger;
      const res = await axios.get(`${apiUrl}/books`);
      this.setState({
        books: res.data
      });
    } catch (error) {
      console.log(error);
    }
  }
  deleteBook=(id)=>{
    const originalState = this.state.books;
    const books = this.state.books.filter(p=> p._id !== id);
    debugger
    this.setState({
      books
    });
    actions.deleteBook(id).then(res=>{
      
    }).catch(err=>{
      toast.error("Error ");
      this.setState({
        books:originalState
      })
    })
  }
  render() {
    const { books } = this.state;
    return (
      <section>
        <h2>Data of Books: Select</h2>
        <table style={{ borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Title</th>
              <th>Author</th>
              <th>Publisher</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, i) => {
              return (
                <tr key={1}>
                  <td>
                    {" "}
                    {i + 1} {"   "}{" "}
                  </td>
                  <td>
                    {" "}
                    {book.title} {"   "}{" "}
                  </td>
                  <td>
                    {" "}
                    {book.author} {"   "}{" "}
                  </td>
                  <td> {book.publisher}</td>
                  <td>
                    <Link to={`/home/${book._id}`} className="link">Modify</Link> |
                    <button onClick={()=>this.deleteBook(book._id)} className="link">Delete</button>
                  </td>
                </tr>
              );
            })}
            <tr>
              {/* <td colspan="5" style="text-align: center; color: #f00">Data not found</td> */}
            </tr>
          </tbody>
        </table>
      </section>
    );
  }
}
