import React from "react";

const Footer: React.FC = () => {
  const whatsappPhone = "12125551234"; // Replace with actual number
  const googleMapsLocation = "https://maps.google.com/?q=Manhattan,New+York"; // Replace with actual location
  const yelpUrl = "https://www.yelp.com/biz/blade-and-brush"; // Replace with actual Yelp business page
  const address = "123 Barber Street, Manhattan, NY 10001";

  return (
    <footer id="contact">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "2rem",
          marginBottom: "2rem",
          textAlign: "left",
        }}
      >
        {/* Contact Section */}
        <div>
          <h3 style={{ color: "#ff9800", marginBottom: "1rem" }}>Contact Us</h3>
          <p>
            📞{" "}
            <a href="tel:+12125551234" style={{ color: "#e0e0e0" }}>
              +1 (212) 555-1234
            </a>
          </p>
          <p>
            ✉️{" "}
            <a href="mailto:hello@bladeandbrush.com" style={{ color: "#e0e0e0" }}>
              hello@bladeandbrush.com
            </a>
          </p>
          <p style={{ marginTop: "1rem" }}>
            <a
              href={`https://wa.me/${whatsappPhone}?text=Hello%20Blade%20%26%20Brush%2C%20I%20would%20like%20to%20book%20an%20appointment`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#25D366",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "600",
                marginTop: "0.5rem",
              }}
            >
              💬 WhatsApp Business
            </a>
          </p>
        </div>

        {/* Location Section */}
        <div>
          <h3 style={{ color: "#ff9800", marginBottom: "1rem" }}>Location</h3>
          <p>{address}</p>
          <p style={{ marginTop: "1rem" }}>
            <a
              href={googleMapsLocation}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#1976D2",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "600",
              }}
            >
              📍 View on Google Maps
            </a>
          </p>
        </div>

        {/* Reviews & Social Section */}
        <div>
          <h3 style={{ color: "#ff9800", marginBottom: "1rem" }}>Follow & Review</h3>
          <p>
            <a
              href={yelpUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "#AF0606",
                color: "#fff",
                padding: "0.5rem 1rem",
                borderRadius: "6px",
                textDecoration: "none",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              ⭐ Review on Yelp
            </a>
          </p>
          <div className="socials" style={{ marginTop: "1rem" }}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              📸 Instagram
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              👥 Facebook
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              🎵 TikTok
            </a>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid #333", paddingTop: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>© 2026 Blade & Brush. All rights reserved.</p>
        <p style={{ fontSize: "0.85rem", opacity: 0.7 }}>Professional Barber Shop | Serving Men & Women</p>
        <p style={{ marginTop: "1rem" }}>
          <button
            onClick={() => (window as any).navigateToAdmin?.()}
            style={{
              background: "rgba(255, 152, 0, 0.2)",
              color: "#ff9800",
              border: "1px solid #ff9800",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: "600",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#ff9800";
              e.currentTarget.style.color = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(255, 152, 0, 0.2)";
              e.currentTarget.style.color = "#ff9800";
            }}
          >
            🔐 Admin Panel
          </button>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
