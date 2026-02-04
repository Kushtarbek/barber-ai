const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Helper function to read JSON file
function readDataFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error(`Error reading ${filename}:`, error);
    return [];
  }
}

// Helper function to write JSON file
function writeDataFile(filename, data) {
  const filePath = path.join(DATA_DIR, filename);
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filename}:`, error);
    return false;
  }
}

// Data access functions
const dataStorage = {
  // Appointments
  getAppointments: () => readDataFile('appointments.json'),
  saveAppointments: (appointments) => writeDataFile('appointments.json', appointments),

  // Customers
  getCustomers: () => readDataFile('customers.json'),
  saveCustomers: (customers) => writeDataFile('customers.json', customers),

  // Messages
  getMessages: () => readDataFile('messages.json'),
  saveMessages: (messages) => writeDataFile('messages.json', messages),

  // Gallery Images
  getGalleryImages: () => readDataFile('gallery.json'),
  saveGalleryImages: (images) => writeDataFile('gallery.json', images),

  // Social embeds
  getSocialEmbeds: () => readDataFile('socials.json'),
  saveSocialEmbeds: (embeds) => writeDataFile('socials.json', embeds),
};

module.exports = dataStorage;
