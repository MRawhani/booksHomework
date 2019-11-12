import axios from "axios";
import config from "./config/keys";

export function getBookById(bookId) {
  return axios
    .get(`${config()}/books/${bookId}`)
    .then(res => {
        
      return res.data;
    })
    .catch(err => {
      Promise.reject(err);
    });
}
export function createBook(bookData) {
  return axios
    .post(`${config()}/books/`, {bookData})
    .then(res => {
        
      return res.data;
    })
    .catch(err => {
        
      return Promise.reject(err);
    });
}
export function updateBook(bookData, bookId) {
    return axios
      .patch(`${config()}/books/${bookId}`, { bookData })
      .then(res => {
        return res.data;
      })
      .catch(err => {
        Promise.reject(err);
      });
  }
  
  export function deleteBook(bookId) {
    return axios
      .delete(`${config()}/books/${bookId}`)
      .then(res => {
        return res.data;
      })
      .catch(err => {
        Promise.reject(err);
      });
  }
  