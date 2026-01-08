import React from "react";

const Hero: React.FC = () => {
  return (
    <>
      <nav>
        <div className="nav-logo">
          <div className="nav-logo-icon">✂️</div>
          <span>Blade & Brush</span>
        </div>
        <ul className="nav-links">
          <li>
            <a href="#home">🏠 Home</a>
          </li>
          <li>
            <a href="#services">📅 Services</a>
          </li>
          <li>
            <a href="#gallery">🖼️ Gallery</a>
          </li>
          <li>
            <a href="#about">📊 About</a>
          </li>
          <li>
            <a href="#contact">💬 Contact</a>
          </li>
        </ul>
        <button
          className="nav-cta"
          onClick={() =>
            window.open(
              "https://wa.me/12125551234?text=Hello%20Blade%20%26%20Brush%2C%20I%20would%20like%20to%20book%20an%20appointment",
              "_blank"
            )
          }
        >
          WhatsApp
        </button>
      </nav>
      <section className="hero" id="home">
        <h1>Welcome to Blade & Brush</h1>
        <p>Premium grooming services tailored to your style</p>
        <div className="hero-buttons">
          <div className="btn-booking-group">
            <a 
              href="https://calendar.google.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Book an Appointment
            </a>
            <span className="btn-booking-subtitle">See availability</span>
          </div>
          <div className="btn-whatsapp-group">
            <button
              className="btn-whatsapp"
              onClick={() =>
                window.open(
                  "https://wa.me/12125551234?text=Hello%20Blade%20%26%20Brush%2C%20I%20would%20like%20to%20book%20an%20appointment",
                  "_blank"
                )
              }
            >
              💬 WhatsApp
            </button>
            <span className="btn-whatsapp-subtitle">Call or text WhatsApp</span>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
