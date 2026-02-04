import React, { useEffect, useState, useRef } from "react";
import { apiClient, type SocialEmbed } from "../api/client";

// Declare Instagram embed script on window
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const SocialEmbedSection: React.FC = () => {
  const [embeds, setEmbeds] = useState<SocialEmbed[]>([]);
  const [loading, setLoading] = useState(false);
  const scriptLoaded = useRef(false);

  // Load Instagram embed script
  useEffect(() => {
    if (scriptLoaded.current) return;
    
    const existingScript = document.querySelector('script[src*="instagram.com/embed.js"]');
    if (existingScript) {
      scriptLoaded.current = true;
      return;
    }

    const script = document.createElement("script");
    script.src = "https://www.instagram.com/embed.js";
    script.async = true;
    script.onload = () => {
      scriptLoaded.current = true;
      // Process any embeds that loaded before the script
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      }
    };
    document.body.appendChild(script);
  }, []);

  // Fetch embeds and re-process when they change
  useEffect(() => {
    const loadEmbeds = async () => {
      try {
        setLoading(true);
        const data = await apiClient.getSocialEmbeds();
        setEmbeds(data);
      } catch (err) {
        console.error("Failed to load social embeds:", err);
      } finally {
        setLoading(false);
      }
    };
    loadEmbeds();
  }, []);

  // Re-process Instagram embeds when embeds change
  useEffect(() => {
    if (embeds.length > 0 && window.instgrm) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        window.instgrm?.Embeds.process();
      }, 100);
    }
  }, [embeds]);

  if (loading) {
    return (
      <section className="social-embed panel panel-social">
        <div className="panel-content panel-content-wide">
          <p className="social-empty">Loading latest clips…</p>
        </div>
      </section>
    );
  }

  if (embeds.length === 0) {
    return null;
  }

  // Extract shortcode from Instagram URL for blockquote embed
  const getInstagramShortcode = (url: string): string | null => {
    const match = url.match(/instagram\.com\/(p|reel|tv)\/([^/?#]+)/i);
    return match ? match[2] : null;
  };

  return (
    <section className="social-embed panel panel-social" id="social">
      <div className="panel-content panel-content-wide">
        <h2 className="panel-title">Latest from Instagram & TikTok</h2>
        <p className="panel-subtitle">Tap to watch—fresh cuts and daily transformations.</p>

        <div className="social-grid">
          {embeds.map((embed) => {
            if (embed.platform === "instagram") {
              const shortcode = getInstagramShortcode(embed.url);
              if (!shortcode) return null;
              
              return (
                <div key={embed.id} className="social-card social-card-instagram">
                  <blockquote
                    className="instagram-media"
                    data-instgrm-captioned
                    data-instgrm-permalink={embed.url}
                    data-instgrm-version="14"
                    style={{
                      background: "#FFF",
                      border: 0,
                      borderRadius: "16px",
                      boxShadow: "0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)",
                      margin: "1px",
                      maxWidth: "540px",
                      minWidth: "280px",
                      padding: 0,
                      width: "100%",
                    }}
                  >
                    <a
                      href={embed.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "block",
                        padding: "16px",
                        textAlign: "center",
                        color: "#000",
                        textDecoration: "none",
                      }}
                    >
                      View this post on Instagram
                    </a>
                  </blockquote>
                </div>
              );
            }
            
            // TikTok uses iframe
            return (
              <div key={embed.id} className="social-card">
                <div className="social-label">TikTok</div>
                <iframe
                  src={embed.embedUrl}
                  title="TikTok video"
                  loading="lazy"
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialEmbedSection;
