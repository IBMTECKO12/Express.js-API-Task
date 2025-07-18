const express = require('express');
const app = express();

// Middleware
app.use(express.json());

// In-memory data store
let items = [
  { id: 1, name: 'Item 1', description: 'First item' }
];

// ======================
// 1. API Setup (Completed)
// ======================
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// ======================
// 2. CRUD Routes (Fully Implemented)
// ======================
// GET all items
app.get('/items', (req, res) => {
  res.json(items);
});

// GET single item by ID
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });
  res.json(item);
});

// POST new item (with validation)
app.post('/items', (req, res) => {
  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }
  const newItem = { 
    id: items.length + 1, 
    name, 
    description 
  };
  items.push(newItem);
  res.status(201).json(newItem);
});

// PUT update item (with validation)
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) return res.status(404).json({ error: 'Item not found' });

  const { name, description } = req.body;
  if (!name || !description) {
    return res.status(400).json({ error: 'Name and description are required' });
  }

  item.name = name;
  item.description = description;
  res.json(item);
});

// DELETE item
app.delete('/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: 'Item not found' });

  items.splice(index, 1);
  res.status(204).send();
});

// ======================
// 3. Error Handling (Enhanced)
// ======================
// ID validation middleware
app.param('id', (req, res, next, id) => {
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }
  next();
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});