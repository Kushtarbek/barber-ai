import React from "react";

const Footer: React.FC = () => {
  const whatsappPhone = "12125551234"; // Replace with actual number
  const googleMapsLocation = "https://maps.google.com/?q=Manhattan,New+York"; // Replace with actual location
  const yelpUrl = "https://www.yelp.com/biz/blade-and-brush"; // Replace with actual Yelp business page
  const address = "123 Barber Street, Manhattan, NY 10001";

  return (
    <footer id="contact" className="site-footer panel panel-footer">
      <div className="panel-content panel-content-wide">
        <h2 className="panel-title">Contact</h2>
        <p className="panel-subtitle">Book, ask a question, or stop by.</p>

        <div className="footer-grid">
          <div className="footer-col">
            <h3>Contact</h3>
            <p>
              <a href="tel:+12125551234">+1 (212) 555-1234</a>
            </p>
            <p>
              <a href="mailto:hello@bladeandbrush.com">hello@bladeandbrush.com</a>
            </p>
            <p className="footer-actions">
              <a
                className="btn btn-primary"
                href={`https://wa.me/${whatsappPhone}?text=Hello%20Blade%20%26%20Brush%2C%20I%20would%20like%20to%20book%20an%20appointment`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Message on WhatsApp
              </a>
            </p>
          </div>

          <div className="footer-col">
            <h3>Location</h3>
            <p>{address}</p>
            <p className="footer-actions">
              <a className="btn btn-secondary" href={googleMapsLocation} target="_blank" rel="noopener noreferrer">
                Open in Maps
              </a>
            </p>
          </div>

          <div className="footer-col">
            <h3>Reviews</h3>
            <p className="footer-actions">
              <a className="btn btn-secondary" href={yelpUrl} target="_blank" rel="noopener noreferrer">
                Review on Yelp
              </a>
            </p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-legal">© 2026 Blade & Brush</div>
          <button className="footer-admin" onClick={() => (window as any).navigateToAdmin?.()}>
            Admin
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
