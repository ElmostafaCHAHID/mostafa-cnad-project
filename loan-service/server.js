const express = require('express');
const logger = require('./middleware/logger');
const loanRoutes = require('./routes/loans');

const app = express();
const PORT = process.env.PORT || 3003;

app.use(express.json());
app.use(logger);

// Mount routes
app.use('/loans', loanRoutes);

// Root health check
app.get('/health', (req, res) => {
  res.json({
    status: "UP",
    service: "loan-service"
  });
});

app.listen(PORT, () => {
  console.log(`Loan Service running on port ${PORT}`);
});