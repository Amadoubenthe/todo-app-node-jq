const express = require("express");
const {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

const router = express.Router();

router.post("/", addBook);
router.get("/", getBooks);
router.get("/:id", getBookById);
router.put("/:id", updateBook);
router.delete("/:id", deleteBook);

module.exports = router;
