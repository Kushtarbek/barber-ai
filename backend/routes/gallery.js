const express = require('express');
const router = express.Router();
const dataStorage = require('../dataStorage');

// GET all gallery images
router.get('/', (req, res) => {
  try {
    const images = dataStorage.getGalleryImages();
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
});

// GET image by ID
router.get('/:id', (req, res) => {
  try {
    const images = dataStorage.getGalleryImages();
    const image = images.find(img => img.id === req.params.id);
    if (!image) {
      return res.status(404).json({ error: 'Image not found' });
    }
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch image' });
  }
});

// POST create new gallery image
router.post('/', (req, res) => {
  try {
    const images = dataStorage.getGalleryImages();
    const newImage = {
      id: Date.now().toString(),
      title: req.body.title,
      type: req.body.type || 'Men',
      description: req.body.description,
      image: req.body.image, // Base64 encoded image
      uploadedAt: req.body.uploadedAt || new Date().toLocaleString(),
    };

    // Validate required fields
    if (!newImage.title || !newImage.description || !newImage.image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    images.push(newImage);
    dataStorage.saveGalleryImages(images);
    res.status(201).json(newImage);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create gallery image' });
  }
});

// PUT update gallery image
router.put('/:id', (req, res) => {
  try {
    const images = dataStorage.getGalleryImages();
    const index = images.findIndex(img => img.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ error: 'Image not found' });
    }

    images[index] = {
      ...images[index],
      ...req.body,
      id: req.params.id, // Ensure ID doesn't change
    };

    dataStorage.saveGalleryImages(images);
    res.json(images[index]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update image' });
  }
});

// DELETE gallery image
router.delete('/:id', (req, res) => {
  try {
    const images = dataStorage.getGalleryImages();
    const filtered = images.filter(img => img.id !== req.params.id);
    
    if (filtered.length === images.length) {
      return res.status(404).json({ error: 'Image not found' });
    }

    dataStorage.saveGalleryImages(filtered);
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete image' });
  }
});

module.exports = router;
