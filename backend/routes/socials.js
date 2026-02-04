const express = require('express');
const router = express.Router();
const dataStorage = require('../dataStorage');
const { detectPlatform, buildEmbedUrl } = require('../utils/socials');

// GET all social embeds
router.get('/', (req, res) => {
  try {
    const embeds = dataStorage.getSocialEmbeds();
    res.json(embeds);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch social embeds' });
  }
});

// POST create new social embed
router.post('/', (req, res) => {
  try {
    const { url } = req.body;
    if (!url) {
      return res.status(400).json({ error: 'url is required' });
    }

    const platform = detectPlatform(url);
    if (!platform) {
      return res.status(400).json({ error: 'Only Instagram or TikTok links are supported' });
    }

    const embedUrl = buildEmbedUrl(url);
    if (!embedUrl) {
      return res.status(400).json({ error: 'Unable to parse the link. Paste a post/reel or TikTok video URL.' });
    }

    const embeds = dataStorage.getSocialEmbeds();
    const newEmbed = {
      id: Date.now().toString(),
      platform,
      url,
      embedUrl,
      createdAt: new Date().toISOString(),
    };
    embeds.unshift(newEmbed);
    dataStorage.saveSocialEmbeds(embeds);
    res.status(201).json(newEmbed);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create social embed' });
  }
});

// DELETE social embed
router.delete('/:id', (req, res) => {
  try {
    const embeds = dataStorage.getSocialEmbeds();
    const filtered = embeds.filter((embed) => embed.id !== req.params.id);
    if (filtered.length === embeds.length) {
      return res.status(404).json({ error: 'Social embed not found' });
    }
    dataStorage.saveSocialEmbeds(filtered);
    res.json({ message: 'Social embed deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete social embed' });
  }
});

module.exports = router;
