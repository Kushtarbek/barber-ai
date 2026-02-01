const express = require('express');
const router = express.Router();
const dataStorage = require('../dataStorage');

// GET all appointments
router.get('/', (req, res) => {
  try {
    const appointments = dataStorage.getAppointments();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
});

// GET appointment by ID
router.get('/:id', (req, res) => {
  try {
    const appointments = dataStorage.getAppointments();
    const appointment = appointments.find(apt => apt.id === req.params.id);
    if (!appointment) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointment' });
  }
});

// POST create new appointment
router.post('/', (req, res) => {
  try {
    const appointments = dataStorage.getAppointments();
    const newAppointment = {
      id: Date.now().toString(),
      customerName: req.body.customerName,
      email: req.body.email,
      phone: req.body.phone,
      service: req.body.service,
      date: req.body.date,
      time: req.body.time,
      status: req.body.status || 'pending',
    };

    // Validate required fields
    if (!newAppointment.customerName || !newAppointment.email || !newAppointment.service || !newAppointment.date || !newAppointment.time) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    appointments.push(newAppointment);
    dataStorage.saveAppointments(appointments);
    res.status(201).json(newAppointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
});

// PUT update appointment
router.put('/:id', (req, res) => {
  try {
    const appointments = dataStorage.getAppointments();
    const index = appointments.findIndex(apt => apt.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    appointments[index] = {
      ...appointments[index],
      ...req.body,
      id: req.params.id, // Ensure ID doesn't change
    };

    dataStorage.saveAppointments(appointments);
    res.json(appointments[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
});

// DELETE appointment
router.delete('/:id', (req, res) => {
  try {
    const appointments = dataStorage.getAppointments();
    const filtered = appointments.filter(apt => apt.id !== req.params.id);
    
    if (filtered.length === appointments.length) {
      return res.status(404).json({ error: 'Appointment not found' });
    }

    dataStorage.saveAppointments(filtered);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
});

module.exports = router;
