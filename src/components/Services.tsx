import React, { useState } from "react";

interface Service {
  id: number;
  name: string;
  description: string;
  duration: string;
  price: string;
  image: string;
  frontImage?: string; // Optional image to show on the front of the card
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
      name: "Men's Classic Haircut",
      description: "Traditional cuts with modern precision",
      duration: "30 min",
      price: "$35",
      image: "/images/classic-haircut.png",
      frontImage: "/images/classic-haircut.png",
    },
    {
      id: 2,
      name: "Beard Trim & Shaping",
      description: "Expert beard shaping and maintenance",
      duration: "20 min",
      price: "$25",
      image: "/images/beard-trim.png",
      frontImage: "/images/beard-trim.png",
    },
    {
      id: 3,
      name: "Full Men's Grooming",
      description: "Haircut, beard, and facial treatment",
      duration: "60 min",
      price: "$65",
      image: "/images/mens-grooming.png",
      frontImage: "/images/mens-grooming.png",
    },
    {
      id: 4,
      name: "Kids Cut",
      description: "Gentle cuts for the little ones",
      duration: "20 min",
      price: "$25",
      image: "/images/kids-cut.png",
      frontImage: "/images/kids-cut.png",
    },
    {
      id: 5,
      name: "Women's Haircut",
      description: "Stylish cuts and precision styling",
      duration: "45 min",
      price: "$45",
      image: "/images/womens-haircut.png",
      frontImage: "/images/womens-haircut.png",
    },
    {
      id: 6,
      name: "Hair Coloring",
      description: "Professional hair coloring for men and women",
      duration: "60 min",
      price: "$55",
      image: "/images/hair-coloring.png",
      frontImage: "/images/hair-coloring.png",
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
                <div 
                  className={`service-flip-front ${service.frontImage ? "has-front-image" : ""}`}
                  style={service.frontImage ? { backgroundImage: `url(${service.frontImage})` } : undefined}
                >
                  {service.frontImage && <div className="service-front-overlay" />}
                  <div className="service-content">
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <div className="service-meta">
                      <div className="service-duration">{service.duration}</div>
                      <div className="service-price">{service.price}</div>
                    </div>
                  </div>
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
