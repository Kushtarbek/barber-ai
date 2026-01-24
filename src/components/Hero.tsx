import React from "react";

const Hero: React.FC = () => {
  return (
    <>
      <nav className="site-nav">
        <div className="nav-logo" aria-label="Blade & Brush">
          Blade & Brush
        </div>
        <ul className="nav-links" aria-label="Primary navigation">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
          <li>
            <a href="#gallery">Gallery</a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#contact">Contact</a>
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
          Book now
        </button>
      </nav>
      <section className="hero panel panel-hero" id="home">
        <div className="panel-content">
          <h1 className="hero-title">Blade & Brush</h1>
          <p className="hero-subtitle">Premium grooming, minimalist experience.</p>

          <div className="hero-buttons">
            <a href="#services" className="btn btn-primary">
              Explore services
            </a>
            <a
              href="https://calendar.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Book a visit
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
