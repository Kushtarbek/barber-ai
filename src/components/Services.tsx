import React from "react";

interface Service {
  id: number;
  icon: string;
  name: string;
  description: string;
  duration: string;
  price: string;
}

const Services: React.FC = () => {
  const services: Service[] = [
    {
      id: 1,
      icon: "✂️",
      name: "Men's Classic Haircut",
      description: "Traditional cuts with modern precision",
      duration: "30 min",
      price: "$35",
    },
    {
      id: 2,
      icon: "💧",
      name: "Beard Trim & Shaping",
      description: "Expert beard shaping and maintenance",
      duration: "20 min",
      price: "$25",
    },
    {
      id: 3,
      icon: "⭐",
      name: "Full Men's Grooming",
      description: "Haircut, beard, and facial treatment",
      duration: "60 min",
      price: "$65",
    },
    {
      id: 4,
      icon: "✂️",
      name: "Kids Cut",
      description: "Gentle cuts for the little ones",
      duration: "20 min",
      price: "$25",
    },
    {
      id: 5,
      icon: "👩‍🦰",
      name: "Women's Haircut",
      description: "Stylish cuts and precision styling",
      duration: "45 min",
      price: "$45",
    },
    {
      id: 6,
      icon: "🎨",
      name: "Hair Coloring",
      description: "Professional hair coloring for men and women",
      duration: "60 min",
      price: "$55",
    },
    {
      id: 7,
      icon: "💆",
      name: "Scalp Treatment",
      description: "Therapeutic scalp treatment and massage",
      duration: "30 min",
      price: "$40",
    },
    {
      id: 8,
      icon: "✨",
      name: "Premium Styling",
      description: "Advanced styling with premium products",
      duration: "45 min",
      price: "$50",
    },
  ];

  return (
    <section className="services" id="services">
      <h2>
        Our <span className="services-title-highlight">Services</span>
      </h2>
      <p className="services-subtitle">Premium grooming services tailored to your style</p>
      <div className="services-grid">
        {services.map((service) => (
          <div key={service.id} className="service-card">
            <div className="service-icon">{service.icon}</div>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <div className="service-divider"></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div className="service-duration">⏱️ {service.duration}</div>
              <div className="service-price">{service.price}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
