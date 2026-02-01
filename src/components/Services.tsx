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

  const shouldShowQuickRefresh = (duration: string) => {
    const match = duration.match(/(\d+)/);
    if (!match) return false;
    return Number(match[1]) <= 45;
  };

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
      image: "https://images.unsplash.com/photo-1521119989659-a83eee488004?w=500&h=700&fit=crop&q=80",
    },
    {
      id: 2,
      icon: "💧",
      name: "Beard Trim & Shaping",
      description: "Expert beard shaping and maintenance",
      duration: "20 min",
      price: "$25",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop&q=80",
    },
    {
      id: 3,
      icon: "⭐",
      name: "Full Men's Grooming",
      description: "Haircut, beard, and facial treatment",
      duration: "60 min",
      price: "$65",
      image: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500&h=700&fit=crop&q=80",
    },
    {
      id: 4,
      icon: "✂️",
      name: "Kids Cut",
      description: "Gentle cuts for the little ones",
      duration: "20 min",
      price: "$25",
      image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=500&h=700&fit=crop&q=80",
    },
    {
      id: 5,
      icon: "👩‍🦰",
      name: "Women's Haircut",
      description: "Stylish cuts and precision styling",
      duration: "45 min",
      price: "$45",
      image: "https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?w=500&h=700&fit=crop&q=80",
    },
    {
      id: 6,
      icon: "🎨",
      name: "Hair Coloring",
      description: "Professional hair coloring for men and women",
      duration: "60 min",
      price: "$55",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=700&fit=crop&q=80",
    },
  ];

  return (
    <section className="services panel panel-services" id="services">
      <div className="panel-content">
        <h2 className="panel-title">Services</h2>
        <p className="panel-subtitle">Simple pricing. Precision cuts. Great vibes. Open late until 8 PM.</p>

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
                  <div className="service-photo-frame">
                    <img src={service.image} alt={service.name} />
                    {shouldShowQuickRefresh(service.duration) && (
                      <div className="service-photo-caption">Refresh your look in less than 45 mins</div>
                    )}
                  </div>
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
