const MongooseErrHandler = require("../helpers/MongooseErrHandler");
const bookModel = require("../models/BookModel");

exports.getbooks = function(req, res) {
  const city = req.query.city;
  const query = city ? { city } : {};

  bookModel.find(query, function(err, foundedElements) {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
    }
    if (city && foundedElements.length === 0) {
      return res.status(422).send({
        errors: [
          {
            title: "No books Found!",
            detail: `لا يوجد نتائج لمدينة  ${city}`
          }
        ]
      });
    }
    res.json(foundedElements);
  });
};

exports.getbookById = function(req, res) {
  const bookId = req.params.id;

  bookModel.findById(bookId, function(err, foundElement) {
    if (err) {
      return res.status(422).send({
        errrs: [{ title: "book Error", description: "There is somthing wrong" }]
      });
    }
    return res.json(foundElement);
  });
};

exports.deletebook = function(req, res) {
  bookModel.findById(req.params.id, function(err, foundedbook) {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
    }

    foundedbook.remove(function(err) {
      if (err) {
        return res
          .status(422)
          .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
      }
      return res.json({ foundedbook, deleted: true });
    });
  });
};
exports.createbook = function(req, res) {
  const {
    bookData: { title, author, publisher }
  } = req.body;

  const book = new bookModel({
    title,
    author,
    publisher
  });

  bookModel.create(book, function(err, savedbook) {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
    }

    return res.json(savedbook);
  });
};

exports.updateBook = function(req, res) {
  const bookData = req.body.bookData;

  bookModel.findById(req.params.id, function(err, foundedbook) {
    if (err) {
      return res
        .status(422)
        .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
    }
    foundedbook.set(bookData);
    foundedbook.save(function(err) {
      if (err) {
        return res
          .status(422)
          .send({ errors: MongooseErrHandler.normalizeErrors(err.errors) });
      }
      return res.status(200).send(foundedbook);
    });
  });
};
