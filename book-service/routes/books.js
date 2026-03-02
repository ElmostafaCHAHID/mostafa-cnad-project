const express = require('express');
const router = express.Router();

// In-memory book storage
let books = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", available: true },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", available: true },
  { id: 3, title: "Design Patterns", author: "Erich Gamma", available: false }
];

// GET all books
router.get('/', (req, res) => {
  res.json({
    service: "book-service",
    count: books.length,
    data: books
  });
});

// GET single book
router.get('/:id', (req, res) => {
  const book = books.find(b => b.id == req.params.id);

  if (!book) {
    return res.status(404).json({
      service: "book-service",
      error: `Book ${req.params.id} not found`
    });
  }

  res.json({
    service: "book-service",
    data: book
  });
});

// POST new book
router.post('/', (req, res) => {
  const { title, author } = req.body;

  if (!title || !author) {
    return res.status(400).json({
      service: "book-service",
      error: "Title and author are required"
    });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    available: true
  };

  books.push(newBook);

  res.status(201).json({
    service: "book-service",
    message: "Book created successfully",
    data: newBook
  });
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: "UP",
    service: "book-service",
    timestamp: new Date()
  });
});

module.exports = router;