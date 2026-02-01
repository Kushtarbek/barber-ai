const express = require('express');
const router = express.Router();
const dataStorage = require('../dataStorage');

// GET all customers
router.get('/', (req, res) => {
  try {
    const customers = dataStorage.getCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
});

// GET customer by ID
router.get('/:id', (req, res) => {
  try {
    const customers = dataStorage.getCustomers();
    const customer = customers.find(cust => cust.id === req.params.id);
    if (!customer) {
      return res.status(404).json({ error: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
});

// POST create new customer
router.post('/', (req, res) => {
  try {
    const customers = dataStorage.getCustomers();
    const newCustomer = {
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      lastVisit: req.body.lastVisit || new Date().toISOString().split('T')[0],
      totalVisits: req.body.totalVisits || 1,
    };

    // Validate required fields
    if (!newCustomer.name || !newCustomer.email || !newCustomer.phone) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    customers.push(newCustomer);
    dataStorage.saveCustomers(customers);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create customer' });
  }
});

// PUT update customer
router.put('/:id', (req, res) => {
  try {
    const customers = dataStorage.getCustomers();
    const index = customers.findIndex(cust => cust.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    customers[index] = {
      ...customers[index],
      ...req.body,
      id: req.params.id, // Ensure ID doesn't change
    };

    dataStorage.saveCustomers(customers);
    res.json(customers[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
});

// DELETE customer
router.delete('/:id', (req, res) => {
  try {
    const customers = dataStorage.getCustomers();
    const filtered = customers.filter(cust => cust.id !== req.params.id);
    
    if (filtered.length === customers.length) {
      return res.status(404).json({ error: 'Customer not found' });
    }

    dataStorage.saveCustomers(filtered);
    res.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
});

module.exports = router;
