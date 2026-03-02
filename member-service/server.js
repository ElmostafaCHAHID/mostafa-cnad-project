const express = require('express');
const logger = require('./middleware/logger');
const memberRoutes = require('./routes/members');

const app = express();
const PORT = process.env.PORT || 3002;

app.use(express.json());
app.use(logger);

// Mount routes
app.use('/members', memberRoutes);

// Root health check
app.get('/health', (req, res) => {
  res.json({
    status: "UP",
    service: "member-service"
  });
});

app.listen(PORT, () => {
  console.log(`Member Service running on port ${PORT}`);
});