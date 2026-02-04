import React, { useState, useEffect } from "react";
import { apiClient, type Appointment, type Customer, type Message, type GalleryImage, type SocialEmbed } from "../api/client";

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "appointments" | "customers" | "messages" | "gallery" | "social">(
    "overview"
  );
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [socialEmbeds, setSocialEmbeds] = useState<SocialEmbed[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "Men" as "Men" | "Women",
    description: "",
    image: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [socialUrl, setSocialUrl] = useState("");

  // Load data from API
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        setError(null);
        const [appts, custs, msgs, imgs, socials] = await Promise.all([
          apiClient.getAppointments(),
          apiClient.getCustomers(),
          apiClient.getMessages(),
          apiClient.getGalleryImages(),
          apiClient.getSocialEmbeds(),
        ]);
        setAppointments(appts);
        setCustomers(custs);
        setMessages(msgs);
        setImages(imgs);
        setSocialEmbeds(socials);
      } catch (err) {
        console.error("Failed to load data:", err);
        setError("Failed to load data. Please check if the API server is running.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const newImage = await apiClient.createGalleryImage({
        title: formData.title,
        type: formData.type,
        description: formData.description,
        image: formData.image,
      });
      setImages([...images, newImage]);
      setFormData({ title: "", type: "Men", description: "", image: "" });
      setPreviewUrl("");
      alert("Image added successfully!");
    } catch (err) {
      console.error("Failed to add image:", err);
      alert("Failed to add image. Please try again.");
    }
  };

  const deleteImage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this image?")) {
      return;
    }
    try {
      await apiClient.deleteGalleryImage(id);
      setImages(images.filter((img) => img.id !== id));
    } catch (err) {
      console.error("Failed to delete image:", err);
      alert("Failed to delete image. Please try again.");
    }
  };

  const handleSocialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!socialUrl.trim()) {
      alert("Paste an Instagram or TikTok link.");
      return;
    }
    try {
      const newEmbed = await apiClient.createSocialEmbed(socialUrl.trim());
      setSocialEmbeds((prev) => [newEmbed, ...prev]);
      setSocialUrl("");
    } catch (err: any) {
      console.error("Failed to add social embed:", err);
      alert(err?.message || "Unable to add embed. Please check the link.");
    }
  };

  const deleteSocialEmbed = async (id: string) => {
    if (!confirm("Remove this embed from the landing page?")) {
      return;
    }
    try {
      await apiClient.deleteSocialEmbed(id);
      setSocialEmbeds((prev) => prev.filter((embed) => embed.id !== id));
    } catch (err) {
      console.error("Failed to delete embed:", err);
      alert("Unable to delete. Please try again.");
    }
  };

  const updateAppointmentStatus = async (id: string, status: "confirmed" | "completed" | "cancelled") => {
    try {
      const updated = await apiClient.updateAppointment(id, { status });
      setAppointments(appointments.map((apt) => (apt.id === id ? updated : apt)));
    } catch (err) {
      console.error("Failed to update appointment:", err);
      alert("Failed to update appointment. Please try again.");
    }
  };

  const markMessageAsRead = async (id: string) => {
    try {
      const updated = await apiClient.updateMessage(id, { read: true });
      setMessages(messages.map((msg) => (msg.id === id ? updated : msg)));
    } catch (err) {
      console.error("Failed to mark message as read:", err);
      alert("Failed to update message. Please try again.");
    }
  };

  const getBusinessStats = () => {
    const totalCustomers = customers.length;
    const upcomingAppointments = appointments.filter((apt) => apt.status === "confirmed").length;
    const totalMessages = messages.length;
    const unreadMessages = messages.filter((msg) => !msg.read).length;
    return { totalCustomers, upcomingAppointments, totalMessages, unreadMessages };
  };

  const stats = getBusinessStats();

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Tilek Studio - Admin Dashboard</h1>
        </div>
        <div style={{ padding: "2rem", textAlign: "center" }}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="admin-header">
          <h1>Tilek Studio - Admin Dashboard</h1>
        </div>
        <div style={{ padding: "2rem", textAlign: "center", color: "red" }}>
          {error}
          <br />
          <small>Make sure the backend server is running on port 8080</small>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
          <h1>Tilek Studio - Admin Dashboard</h1>
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
        <button className={`tab ${activeTab === "social" ? "active" : ""}`} onClick={() => setActiveTab("social")}>
          📱 Social
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

        {/* Social Tab */}
        {activeTab === "social" && (
          <div className="social-section">
            <h2>Landing Page Videos</h2>
            <form onSubmit={handleSocialSubmit} className="social-form">
              <div className="form-group">
                <label>Instagram or TikTok Link</label>
                <input
                  type="url"
                  value={socialUrl}
                  onChange={(e) => setSocialUrl(e.target.value)}
                  placeholder="https://www.instagram.com/reel/DSLN3obErYD/"
                />
              </div>
              <button type="submit" className="btn-submit">
                Add video
              </button>
            </form>

            <div className="social-list">
              {socialEmbeds.length === 0 ? (
                <p className="no-data">No videos yet. Paste a link above.</p>
              ) : (
                socialEmbeds.map((embed) => (
                  <div key={embed.id} className="social-item">
                    <div className="social-item-details">
                      <strong>{embed.platform === "instagram" ? "Instagram" : "TikTok"}</strong>
                      <span>{embed.url}</span>
                    </div>
                    <button className="btn-delete" onClick={() => deleteSocialEmbed(embed.id)}>
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
