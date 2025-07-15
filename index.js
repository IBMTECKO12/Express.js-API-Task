// ======================
// 1. SETTING UP THE API
// ======================
const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// ==============================
// 2. DATA STORE (In-Memory Array)
// ==============================
let items = [
  { id: 1, name: 'Item 1', description: 'First item' }
];

// ====================================
// 3. CRUD ROUTES IMPLEMENTATION
// ====================================
// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET single item by ID
app.get('/items/:id', (req, res) => {
  // ... (implementation)
});

// POST, PUT, DELETE routes...
// ... (other CRUD operations)

// ====================================
// 4. DATA VALIDATION & ERROR HANDLING
// ====================================
// ID validation middleware
app.param('id', (req, res, next, id) => {
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
});

// 404 handler (invalid routes)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// ======================
// 5. START THE SERVER
// ======================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});