const express = require('express');
const router = express.Router();
const dataStorage = require('../dataStorage');

// GET all messages
router.get('/', (req, res) => {
  try {
    const messages = dataStorage.getMessages();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
});

// GET message by ID
router.get('/:id', (req, res) => {
  try {
    const messages = dataStorage.getMessages();
    const message = messages.find(msg => msg.id === req.params.id);
    if (!message) {
      return res.status(404).json({ error: 'Message not found' });
    }
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch message' });
  }
});

// POST create new message
router.post('/', (req, res) => {
  try {
    const messages = dataStorage.getMessages();
    const newMessage = {
      id: Date.now().toString(),
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone,
      message: req.body.message,
      timestamp: req.body.timestamp || new Date().toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      }),
      read: req.body.read || false,
    };

    // Validate required fields
    if (!newMessage.customerName || !newMessage.message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    messages.push(newMessage);
    dataStorage.saveMessages(messages);
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create message' });
  }
});

// PUT update message (e.g., mark as read)
router.put('/:id', (req, res) => {
  try {
    const messages = dataStorage.getMessages();
    const index = messages.findIndex(msg => msg.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Message not found' });
    }

    messages[index] = {
      ...messages[index],
      ...req.body,
      id: req.params.id, // Ensure ID doesn't change
    };

    dataStorage.saveMessages(messages);
    res.json(messages[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update message' });
  }
});

// DELETE message
router.delete('/:id', (req, res) => {
  try {
    const messages = dataStorage.getMessages();
    const filtered = messages.filter(msg => msg.id !== req.params.id);
    
    if (filtered.length === messages.length) {
      return res.status(404).json({ error: 'Message not found' });
    }

    dataStorage.saveMessages(filtered);
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete message' });
  }
});

module.exports = router;
