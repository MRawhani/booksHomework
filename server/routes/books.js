const express = require("express");
const router = express.Router();

const book = require('../controllers/BookController')

router.get("", book.getbooks );
router.post("",book.createbook );
router.patch("/:id", book.updateBook);
router.delete("/:id", book.deletebook );
router.get("/:id", book.getbookById );



module.exports = router;
  