import React, { useState, useEffect } from "react";

interface Appointment {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "completed" | "cancelled";
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  lastVisit: string;
  totalVisits: number;
}

interface Message {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface UploadedImage {
  id: string;
  title: string;
  type: "Men" | "Women";
  description: string;
  image: string;
  uploadedAt: string;
}

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "customers" | "messages" | "gallery">(
    "overview"
  );
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "Men" as "Men" | "Women",
    description: "",
    image: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Load data from localStorage
  useEffect(() => {
    const storedAppointments = localStorage.getItem("appointments");
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    } else {
      // Add demo appointments
      const demoAppointments: Appointment[] = [
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
      setAppointments(demoAppointments);
      localStorage.setItem("appointments", JSON.stringify(demoAppointments));
    }

    const storedCustomers = localStorage.getItem("customers");
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    } else {
      // Add demo customers
      const demoCustomers: Customer[] = [
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
      setCustomers(demoCustomers);
      localStorage.setItem("customers", JSON.stringify(demoCustomers));
    }

    const storedMessages = localStorage.getItem("customerMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    } else {
      // Add demo messages
      const demoMessages: Message[] = [
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
      setMessages(demoMessages);
      localStorage.setItem("customerMessages", JSON.stringify(demoMessages));
    }

    const storedImages = localStorage.getItem("galleryImages");
    if (storedImages) {
      setImages(JSON.parse(storedImages));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData({ ...formData, image: base64 });
        setPreviewUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill in all fields");
      return;
    }

    const newImage: UploadedImage = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      image: formData.image,
      uploadedAt: new Date().toLocaleString(),
    };

    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    localStorage.setItem("galleryImages", JSON.stringify(updatedImages));
    setFormData({ title: "", type: "Men", description: "", image: "" });
    setPreviewUrl("");
    alert("Image added successfully!");
  };

  const deleteImage = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem("galleryImages", JSON.stringify(updatedImages));
  };

  const updateAppointmentStatus = (id: string, status: "confirmed" | "completed" | "cancelled") => {
    const updated = appointments.map((apt) => (apt.id === id ? { ...apt, status } : apt));
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const markMessageAsRead = (id: string) => {
    const updated = messages.map((msg) => (msg.id === id ? { ...msg, read: true } : msg));
    setMessages(updated);
    localStorage.setItem("customerMessages", JSON.stringify(updated));
  };

  const getBusinessStats = () => {
    const totalCustomers = customers.length;
    const upcomingAppointments = appointments.filter((apt) => apt.status === "confirmed").length;
    const totalMessages = messages.length;
    const unreadMessages = messages.filter((msg) => !msg.read).length;
    return { totalCustomers, upcomingAppointments, totalMessages, unreadMessages };
  };

  const stats = getBusinessStats();

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <h1>Blade & Brush - Admin Dashboard</h1>
        <button className="btn-back" onClick={() => (window as any).navigateBack?.()}>
          ← Back to Website
        </button>
      </div>

      <div className="admin-tabs">
        <button className={`tab ${activeTab === "overview" ? "active" : ""}`} onClick={() => setActiveTab("overview")}>
          📊 Overview
        </button>
        <button
          className={`tab ${activeTab === "appointments" ? "active" : ""}`}
          onClick={() => setActiveTab("appointments")}
        >
          📅 Appointments ({appointments.length})
        </button>
        <button
          className={`tab ${activeTab === "customers" ? "active" : ""}`}
          onClick={() => setActiveTab("customers")}
        >
          👥 Customers ({customers.length})
        </button>
        <button className={`tab ${activeTab === "messages" ? "active" : ""}`} onClick={() => setActiveTab("messages")}>
          💬 Messages ({stats.unreadMessages} new)
        </button>
        <button className={`tab ${activeTab === "gallery" ? "active" : ""}`} onClick={() => setActiveTab("gallery")}>
          🖼️ Gallery ({images.length})
        </button>
      </div>

      <div className="admin-content">
        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="overview-section">
            <h2>Business Overview</h2>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <div className="stat-label">Total Customers</div>
                  <div className="stat-value">{stats.totalCustomers}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📅</div>
                <div className="stat-info">
                  <div className="stat-label">Upcoming Appointments</div>
                  <div className="stat-value">{stats.upcomingAppointments}</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">💬</div>
                <div className="stat-info">
                  <div className="stat-label">Total Messages</div>
                  <div className="stat-value">{stats.totalMessages}</div>
                </div>
              </div>
              <div className="stat-card highlight">
                <div className="stat-icon">🔔</div>
                <div className="stat-info">
                  <div className="stat-label">Unread Messages</div>
                  <div className="stat-value">{stats.unreadMessages}</div>
                </div>
              </div>
            </div>

            <div className="overview-section">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {appointments.slice(0, 3).map((apt) => (
                  <div key={apt.id} className="activity-item">
                    <span className="activity-time">
                      {apt.date} {apt.time}
                    </span>
                    <span className="activity-text">
                      {apt.customerName} - {apt.service}
                    </span>
                    <span className={`activity-status ${apt.status}`}>{apt.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="appointments-section">
            <h2>Appointments</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Service</th>
                    <th>Date & Time</th>
                    <th>Phone</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((apt) => (
                    <tr key={apt.id}>
                      <td>{apt.customerName}</td>
                      <td>{apt.service}</td>
                      <td>
                        {apt.date} {apt.time}
                      </td>
                      <td>
                        <a href={`tel:${apt.phone}`}>{apt.phone}</a>
                      </td>
                      <td>
                        <span className={`status-badge ${apt.status}`}>{apt.status}</span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          {apt.status === "pending" && (
                            <button
                              className="btn-small btn-confirm"
                              onClick={() => updateAppointmentStatus(apt.id, "confirmed")}
                            >
                              Confirm
                            </button>
                          )}
                          {apt.status !== "completed" && apt.status !== "cancelled" && (
                            <button
                              className="btn-small btn-complete"
                              onClick={() => updateAppointmentStatus(apt.id, "completed")}
                            >
                              Complete
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Customers Tab */}
        {activeTab === "customers" && (
          <div className="customers-section">
            <h2>Customer Directory</h2>
            <div className="table-container">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Last Visit</th>
                    <th>Total Visits</th>
                    <th>Contact</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.email}</td>
                      <td>{customer.phone}</td>
                      <td>{customer.lastVisit}</td>
                      <td>
                        <span className="visit-badge">{customer.totalVisits}</span>
                      </td>
                      <td>
                        <div className="contact-buttons">
                          <a href={`tel:${customer.phone}`} className="btn-small btn-call">
                            📞 Call
                          </a>
                          <a href={`mailto:${customer.email}`} className="btn-small btn-email">
                            ✉️ Email
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {activeTab === "messages" && (
          <div className="messages-section">
            <h2>Customer Messages</h2>
            <div className="messages-list">
              {messages.length === 0 ? (
                <p className="no-data">No messages yet</p>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className={`message-card ${msg.read ? "read" : "unread"}`}>
                    <div className="message-header">
                      <div className="message-customer">
                        <strong>{msg.customerName}</strong>
                        <span className="message-time">{msg.timestamp}</span>
                      </div>
                      {!msg.read && (
                        <button className="btn-small btn-mark-read" onClick={() => markMessageAsRead(msg.id)}>
                          Mark as Read
                        </button>
                      )}
                    </div>
                    <div className="message-content">{msg.message}</div>
                    <div className="message-contact">
                      <a href={`tel:${msg.phone}`} className="btn-small btn-call">
                        📞 {msg.phone}
                      </a>
                      <a href={`mailto:${msg.email}`} className="btn-small btn-email">
                        ✉️ {msg.email}
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="gallery-section">
            <h2>Gallery Management</h2>
            <form onSubmit={handleSubmit} className="gallery-form">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Classic Fade"
                />
              </div>

              <div className="form-group">
                <label>Type</label>
                <select name="type" value={formData.type} onChange={handleInputChange}>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                </select>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe this hairstyle..."
                  rows={3}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Image</label>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                {previewUrl && <img src={previewUrl} alt="Preview" className="image-preview" />}
              </div>

              <button type="submit" className="btn-submit">
                Add to Gallery
              </button>
            </form>

            <div className="images-grid">
              {images.map((img) => (
                <div key={img.id} className="image-card">
                  <img src={img.image} alt={img.title} />
                  <div className="image-info">
                    <h4>{img.title}</h4>
                    <p>{img.type}</p>
                    <small>{img.uploadedAt}</small>
                    <button className="btn-delete" onClick={() => deleteImage(img.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
