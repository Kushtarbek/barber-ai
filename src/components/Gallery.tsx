import React, { useState, useEffect } from "react";
import { apiClient, type GalleryImage } from "../api/client";

interface GalleryItem {
  id: number;
  title: string;
  type: "Men" | "Women";
  description: string;
  image: string;
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

  // Load uploaded images from API
  useEffect(() => {
    const loadGalleryImages = async () => {
      try {
        const uploadedImages: GalleryImage[] = await apiClient.getGalleryImages();

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
      } catch (err) {
        console.error("Failed to load gallery images:", err);
        // Fallback to default items only
        setAllItems(defaultItems);
      }
    };

    loadGalleryImages();
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
      <section className="gallery panel panel-gallery" id="gallery">
        <div className="panel-content">
          <p>Loading gallery...</p>
        </div>
      </section>
    );
  }

  const currentItem = allItems[currentIndex];

  return (
    <section className="gallery panel panel-gallery" id="gallery">
      <div className="panel-content panel-content-wide">
        <h2 className="panel-title">Gallery</h2>
        <p className="panel-subtitle">Fresh cuts and happy clients—take a peek.</p>

        <div className="carousel-container">
          <div className="carousel-main">
            <div className="carousel-image-wrapper">
              <img
                src={currentItem.image}
                alt={currentItem.title}
                className="carousel-image"
                onError={(e) => {
                  e.currentTarget.src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500"%3E%3Crect fill="%23f2f2f2" width="800" height="500"/%3E%3Ctext x="50%25" y="50%25" font-size="32" fill="%23999" text-anchor="middle" dominant-baseline="middle"%3EPhoto%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>

            <button className="carousel-nav carousel-nav-prev" onClick={goToPrevious} aria-label="Previous">
              &#10094;
            </button>
            <button className="carousel-nav carousel-nav-next" onClick={goToNext} aria-label="Next">
              &#10095;
            </button>
          </div>

          <div className="carousel-description">
            <div className="carousel-header">
              <h3>{currentItem.title}</h3>
              <span className="haircut-type">{currentItem.type}</span>
            </div>
            <p>{currentItem.description}</p>
          </div>

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

          <div className="gallery-socials">
            <h3>Follow</h3>
            <p className="socials-subtitle">See latest posts and styles. Questions? See you in DM.</p>
            <div className="socials">
              <a href="https://instagram.com/bakashov_tilek" target="_blank" rel="noopener noreferrer" title="Instagram">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1 1 12.324 0 6.162 6.162 0 0 1-12.324 0zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm4.965-10.322a1.44 1.44 0 1 1 2.881.001 1.44 1.44 0 0 1-2.881-.001z" />
                </svg>
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a href="https://www.tiktok.com/@bakashov_tilek" target="_blank" rel="noopener noreferrer" title="TikTok">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" role="img" aria-label="TikTok">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
              <a href="https://t.me/Tiki_HAIRSTILIST" target="_blank" rel="noopener noreferrer" title="Telegram">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9.993 15.6 9.86 19.2c.37 0 .53-.16.72-.35l1.73-1.65 3.6 2.64c.66.36 1.13.17 1.3-.61l2.36-11.07h0c.2-.93-.34-1.3-1-1.06L3.36 10.1c-.9.35-.89.85-.16 1.08l3.97 1.24 9.2-5.8c.43-.26.82-.12.5.14l-7.45 6.84z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
