import React, { useState } from "react";

interface Service {
  id: number;
  icon: string;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;
}

const Services: React.FC = () => {
  const [flipped, setFlipped] = useState<{ [key: number]: boolean }>({});

  const toggleFlip = (id: number) => {
    setFlipped((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const services: Service[] = [
    {
      id: 1,
      icon: "✂️",
      name: "Men's Classic Haircut",
      description: "Traditional cuts with modern precision",
      duration: "30 min",
      price: "$35",
      image: "https://images.unsplash.com/photo-1599351990921-c4d37e2a65b0?w=400&h=400&fit=crop&q=80",
    },
    {
      id: 2,
      icon: "💧",
      name: "Beard Trim & Shaping",
      description: "Expert beard shaping and maintenance",
      duration: "20 min",
      price: "$25",
      image: "https://images.unsplash.com/photo-1621905167918-48416bd8575a?w=400&h=400&fit=crop&q=80",
    },
    {
      id: 3,
      icon: "⭐",
      name: "Full Men's Grooming",
      description: "Haircut, beard, and facial treatment",
      duration: "60 min",
      price: "$65",
      image: "https://images.unsplash.com/photo-1585747860715-cd4628902d4a?w=400&h=400&fit=crop&q=80",
    },
    {
      id: 4,
      icon: "✂️",
      name: "Kids Cut",
      description: "Gentle cuts for the little ones",
      duration: "20 min",
      price: "$25",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=400&fit=crop&q=80",
    },
    {
      id: 5,
      icon: "👩‍🦰",
      name: "Women's Haircut",
      description: "Stylish cuts and precision styling",
      duration: "45 min",
      price: "$45",
      image: "https://images.unsplash.com/photo-1588361035519-c8e6436ae580?w=400&h=400&fit=crop&q=80",
    },
    {
      id: 6,
      icon: "🎨",
      name: "Hair Coloring",
      description: "Professional hair coloring for men and women",
      duration: "60 min",
      price: "$55",
      image: "https://images.unsplash.com/photo-1595777707802-52a877cfed4c?w=400&h=400&fit=crop&q=80",
    },
    {
      id: 7,
      icon: "💆",
      name: "Scalp Treatment",
      description: "Therapeutic scalp treatment and massage",
      duration: "30 min",
      price: "$40",
      image: "https://images.unsplash.com/photo-1540575467063-178cb50ee898?w=400&h=400&fit=crop&q=80",
    },
    {
      id: 8,
      icon: "✨",
      name: "Premium Styling",
      description: "Advanced styling with premium products",
      duration: "45 min",
      price: "$50",
      image: "https://images.unsplash.com/photo-1562322140-8baeae34c886?w=400&h=400&fit=crop&q=80",
    },
  ];

  return (
    <section className="services panel panel-services" id="services">
      <div className="panel-content">
        <h2 className="panel-title">Services</h2>
        <p className="panel-subtitle">Simple pricing. Precision cuts. Great vibes.</p>

        <div className="services-grid">
          {services.map((service) => (
            <button
              key={service.id}
              type="button"
              className="service-flip-card"
              onClick={() => toggleFlip(service.id)}
              aria-label={`View ${service.name}`}
            >
              <div className={`service-flip-inner ${flipped[service.id] ? "flipped" : ""}`}>
                <div className="service-flip-front">
                  <div className="service-icon" aria-hidden="true">
                    {service.icon}
                  </div>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <div className="service-divider"></div>
                  <div className="service-meta">
                    <div className="service-duration">{service.duration}</div>
                    <div className="service-price">{service.price}</div>
                  </div>
                  <div className="flip-hint">Tap to preview</div>
                </div>

                <div className="service-flip-back" aria-hidden={!flipped[service.id]}>
                  <img src={service.image} alt={service.name} />
                  <div className="flip-hint-back">Tap to return</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
