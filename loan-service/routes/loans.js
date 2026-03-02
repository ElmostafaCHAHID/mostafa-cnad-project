const express = require('express');
const axios = require('axios');
const router = express.Router();

// Environment variables (important for Docker later)
const BOOK_SERVICE_URL = process.env.BOOK_SERVICE_URL || 'http://localhost:3001';
const MEMBER_SERVICE_URL = process.env.MEMBER_SERVICE_URL || 'http://localhost:3002';

// In-memory loan storage
let loans = [];
let loanIdCounter = 1;

// Helper: fetch book
async function fetchBook(bookId) {
  const response = await axios.get(`${BOOK_SERVICE_URL}/books/${bookId}`);
  return response.data.data;
}

// Helper: fetch member
async function fetchMember(memberId) {
  const response = await axios.get(`${MEMBER_SERVICE_URL}/members/${memberId}`);
  return response.data.data;
}

// POST /loans — Create new loan
router.post('/', async (req, res) => {
  const { bookId, memberId } = req.body;

  if (!bookId || !memberId) {
    return res.status(400).json({
      service: "loan-service",
      error: "bookId and memberId are required"
    });
  }

  try {
    // Validate book
    const book = await fetchBook(bookId);

    if (!book.available) {
      return res.status(409).json({
        service: "loan-service",
        error: "Book is not available"
      });
    }

    // Validate member
    const member = await fetchMember(memberId);

    // Create loan
    const newLoan = {
      id: loanIdCounter++,
      bookId: book.id,
      bookTitle: book.title,
      memberId: member.id,
      memberName: member.name,
      loanDate: new Date().toISOString(),
      status: "ACTIVE"
    };

    loans.push(newLoan);

    res.status(201).json({
      service: "loan-service",
      message: "Loan created successfully",
      data: newLoan
    });

  } catch (error) {

  // If Book or Member service returned an error (like 404)
  if (error.response) {
    return res.status(error.response.status).json({
      service: "loan-service",
      error: error.response.data.error || "Upstream service error"
    });
  }

  // If service is unreachable (network failure)
  return res.status(503).json({
    service: "loan-service",
    error: "Dependent service unavailable",
    detail: error.message
  });
}
});

// GET all loans
router.get('/', (req, res) => {
  res.json({
    service: "loan-service",
    count: loans.length,
    data: loans
  });
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: "UP",
    service: "loan-service",
    timestamp: new Date()
  });
});

module.exports = router;