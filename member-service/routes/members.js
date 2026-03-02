const express = require('express');
const router = express.Router();

// In-memory member storage
let members = [
  { id: 1, name: "Mostafa Chahid", email: "mostafa@example.com" },
  { id: 2, name: "sara Kabli ", email: "sara@example.com" }
];

// GET all members
router.get('/', (req, res) => {
  res.json({
    service: "member-service",
    count: members.length,
    data: members
  });
});

// GET single member
router.get('/:id', (req, res) => {
  const member = members.find(m => m.id == req.params.id);

  if (!member) {
    return res.status(404).json({
      service: "member-service",
      error: `Member ${req.params.id} not found`
    });
  }

  res.json({
    service: "member-service",
    data: member
  });
});

// POST new member
router.post('/', (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      service: "member-service",
      error: "Name and email are required"
    });
  }

  const newMember = {
    id: members.length + 1,
    name,
    email
  };

  members.push(newMember);

  res.status(201).json({
    service: "member-service",
    message: "Member created successfully",
    data: newMember
  });
});

// Health check
router.get('/health', (req, res) => {
  res.json({
    status: "UP",
    service: "member-service",
    timestamp: new Date()
  });
});

module.exports = router;