import React, { useState, useEffect } from "react";

interface GalleryItem {
  id: number;
  title: string;
  type: "Men" | "Women";
  description: string;
  image: string;
}

interface UploadedImage {
  id: string;
  title: string;
  type: "Men" | "Women";
  description: string;
  image: string;
  uploadedAt: string;
}

const Gallery: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoplay, setIsAutoplay] = useState<boolean>(true);
  const [allItems, setAllItems] = useState<GalleryItem[]>([]);

  // Default gallery items with realistic haircut photos
  const defaultItems: GalleryItem[] = [
    {
      id: 1,
      title: "Classic Fade - Modern Cut",
      type: "Men",
      description:
        "A timeless fade with clean lines and precision tapering. Perfect for professionals who want a sharp, well-groomed look. This style features a fade from the sides blended smoothly into length on top.",
      image: "https://images.unsplash.com/photo-1599351990921-c4d37e2a65b0?w=800&h=500&fit=crop&q=80",
    },
    {
      id: 2,
      title: "Textured Undercut - Men",
      type: "Men",
      description:
        "A bold undercut with textured styling on top. This contemporary style features sharp contrast between short sides and voluminous top. Great for those wanting to make a statement.",
      image: "https://images.unsplash.com/photo-1605286372157-d0d3a7e65eae?w=800&h=500&fit=crop&q=80",
    },
    {
      id: 3,
      title: "Layered Waves - Women",
      type: "Women",
      description:
        "Soft, layered waves that add volume and movement. This sophisticated style is perfect for creating an elegant, flowing look. Features seamless layers for natural texture and bounce.",
      image: "https://images.unsplash.com/photo-1588361035519-c8e6436ae580?w=800&h=500&fit=crop&q=80",
    },
    {
      id: 4,
      title: "Sleek Bob - Women",
      type: "Women",
      description:
        "A chic, modern bob cut with clean lines and a smooth finish. This timeless style can be customized to any hair type and face shape. Perfect for a professional, polished appearance.",
      image: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?w=800&h=500&fit=crop&q=80",
    },
    {
      id: 5,
      title: "Textured Lob - Women",
      type: "Women",
      description:
        "A modern long bob with textured layers and tousled styling. This versatile cut works beautifully on all hair types and offers endless styling options for a contemporary, effortless look.",
      image: "https://images.unsplash.com/photo-1595433707802-6b2626ef1c91?w=800&h=500&fit=crop&q=80",
    },
  ];

  // Load uploaded images from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("galleryImages");
    const uploadedImages: UploadedImage[] = stored ? JSON.parse(stored) : [];

    // Convert uploaded images to GalleryItem format
    const convertedImages: GalleryItem[] = uploadedImages.map((img, idx) => ({
      id: 100 + idx, // Use higher IDs to distinguish from defaults
      title: img.title,
      type: img.type,
      description: img.description,
      image: img.image,
    }));

    // Combine default and uploaded images
    setAllItems([...defaultItems, ...convertedImages]);
  }, []);

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoplay || allItems.length === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % allItems.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, allItems.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allItems.length) % allItems.length);
    setIsAutoplay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allItems.length);
    setIsAutoplay(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoplay(false);
  };

  if (allItems.length === 0) {
    return (
      <section className="gallery" id="gallery">
        <p>Loading gallery...</p>
      </section>
    );
  }

  const currentItem = allItems[currentIndex];

  return (
    <section className="gallery" id="gallery">
      <h2>
        Our <span className="gallery-title-highlight">Haircut Gallery</span>
      </h2>

      <div className="carousel-container">
        <div className="carousel-main">
          {/* Main Image */}
          <div className="carousel-image-wrapper">
            <img
              src={currentItem.image}
              alt={currentItem.title}
              className="carousel-image"
              onError={(e) => {
                e.currentTarget.src =
                  'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"%3E%3Crect fill="%23333" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EHaircut Photo%3C/text%3E%3C/svg%3E';
              }}
            />
          </div>

          {/* Navigation Arrows */}
          <button className="carousel-nav carousel-nav-prev" onClick={goToPrevious}>
            &#10094;
          </button>
          <button className="carousel-nav carousel-nav-next" onClick={goToNext}>
            &#10095;
          </button>
        </div>

        {/* Description */}
        <div className="carousel-description">
          <div className="carousel-header">
            <h3>{currentItem.title}</h3>
            <span className="haircut-type">{currentItem.type}</span>
          </div>
          <p>{currentItem.description}</p>
        </div>

        {/* Dots Navigation */}
        <div className="carousel-dots">
          {allItems.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Autoplay Toggle */}
        <button
          className="autoplay-toggle"
          onClick={() => setIsAutoplay(!isAutoplay)}
          title={isAutoplay ? "Pause autoplay" : "Resume autoplay"}
        >
          {isAutoplay ? "⏸️ Pause" : "▶️ Play"}
        </button>
      </div>
    </section>
  );
};

export default Gallery;
