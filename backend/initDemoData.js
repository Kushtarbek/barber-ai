const dataStorage = require('./dataStorage');

// Initialize demo data if data files don't exist
function initDemoData() {
  const appointments = dataStorage.getAppointments();
  const customers = dataStorage.getCustomers();
  const messages = dataStorage.getMessages();

  // Only initialize if data is empty
  if (appointments.length === 0) {
    const demoAppointments = [
      {
        id: "1",
        customerName: "John Smith",
        email: "john@example.com",
        phone: "+1-212-555-0101",
        service: "Men's Classic Haircut",
        date: "2026-01-10",
        time: "2:00 PM",
        status: "confirmed",
      },
      {
        id: "2",
        customerName: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+1-212-555-0102",
        service: "Women's Haircut",
        date: "2026-01-10",
        time: "3:30 PM",
        status: "confirmed",
      },
    ];
    dataStorage.saveAppointments(demoAppointments);
    console.log("✅ Initialized demo appointments");
  }

  if (customers.length === 0) {
    const demoCustomers = [
      {
        id: "1",
        name: "John Smith",
        email: "john@example.com",
        phone: "+1-212-555-0101",
        lastVisit: "2026-01-05",
        totalVisits: 8,
      },
      {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+1-212-555-0102",
        lastVisit: "2026-01-03",
        totalVisits: 5,
      },
      {
        id: "3",
        name: "Michael Brown",
        email: "michael@example.com",
        phone: "+1-212-555-0103",
        lastVisit: "2025-12-28",
        totalVisits: 12,
      },
    ];
    dataStorage.saveCustomers(demoCustomers);
    console.log("✅ Initialized demo customers");
  }

  if (messages.length === 0) {
    const demoMessages = [
      {
        id: "1",
        customerName: "John Smith",
        email: "john@example.com",
        phone: "+1-212-555-0101",
        message: "Hi! I'd like to book an appointment for next Saturday.",
        timestamp: "2026-01-08 10:30 AM",
        read: false,
      },
      {
        id: "2",
        customerName: "Sarah Johnson",
        email: "sarah@example.com",
        phone: "+1-212-555-0102",
        message: "Thanks for the great haircut! See you next month.",
        timestamp: "2026-01-07 5:15 PM",
        read: true,
      },
    ];
    dataStorage.saveMessages(demoMessages);
    console.log("✅ Initialized demo messages");
  }
}

// Run initialization
initDemoData();
