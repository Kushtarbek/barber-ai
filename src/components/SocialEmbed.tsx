import React, { useEffect, useState, useRef } from "react";
import { apiClient, type SocialEmbed } from "../api/client";

// Declare embed scripts on window
declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

const loadScript = (src: string): Promise<void> =>
  new Promise((resolve) => {
    const existing = document.querySelector(`script[src*="${src.split("/")[2]}"]`);
    if (existing) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    document.body.appendChild(script);
  });

const SocialEmbedSection: React.FC = () => {
  const [embeds, setEmbeds] = useState<SocialEmbed[]>([]);
  const [loading, setLoading] = useState(false);
  const scriptsLoaded = useRef(false);

  // Load Instagram and TikTok embed scripts
  useEffect(() => {
    if (scriptsLoaded.current) return;
    (async () => {
      await Promise.all([
        loadScript("https://www.instagram.com/embed.js"),
        loadScript("https://www.tiktok.com/embed.js"),
      ]);
      scriptsLoaded.current = true;
      window.instgrm?.Embeds.process();
    })();
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

  // Re-process embeds when they change (Instagram + TikTok script reload for dynamic content)
  useEffect(() => {
    if (embeds.length === 0) return;
    const timer = setTimeout(() => {
      window.instgrm?.Embeds.process();
      // TikTok embed.js processes on load; re-append to process new blockquotes
      const tiktokEmbeds = embeds.filter((e) => e.platform === "tiktok");
      if (tiktokEmbeds.length > 0) {
        const old = document.querySelector('script[src*="tiktok.com/embed.js"]');
        if (old?.parentNode) {
          const clone = old.cloneNode() as HTMLScriptElement;
          old.parentNode.replaceChild(clone, old);
        }
      }
    }, 150);
    return () => clearTimeout(timer);
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

  // Extract shortcode from Instagram URL for blockquote embed
  const getInstagramShortcode = (url: string): string | null => {
    const match = url.match(/instagram\.com\/(p|reel|tv)\/([^/?#]+)/i);
    return match ? match[2] : null;
  };

  const instagramEmbeds = embeds.filter((e) => e.platform === "instagram");
  const tiktokEmbeds = embeds.filter((e) => e.platform === "tiktok");

  const renderInstagramCard = (embed: SocialEmbed) => {
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
  };

  const renderTikTokCard = (embed: SocialEmbed) => {
    const videoId = embed.url.match(/tiktok\.com\/.*\/video\/(\d+)/i)?.[1];
    if (!videoId) return null;
    return (
      <div key={embed.id} className="social-card social-card-tiktok">
        <blockquote
          className="tiktok-embed"
          cite={embed.url}
          data-video-id={videoId}
          style={{ maxWidth: "605px", minWidth: "325px" }}
        >
          <section>
            <a href={embed.url} target="_blank" rel="noopener noreferrer">
              View on TikTok
            </a>
          </section>
        </blockquote>
      </div>
    );
  };

  return (
    <section className="social-embed panel panel-social" id="social">
      <div className="panel-content panel-content-wide">
        <h2 className="panel-title">Latest from Instagram & TikTok</h2>
        <p className="panel-subtitle">Tap to watch—fresh cuts and daily transformations.</p>

        <div className="social-grid social-grid-two-col">
          <div className="social-column">
            <h3 className="social-column-title">Instagram</h3>
            <div className="social-column-inner">
              {instagramEmbeds.length > 0 ? (
                instagramEmbeds.map(renderInstagramCard)
              ) : (
                <div className="social-placeholder">
                  <p>No Instagram videos yet.</p>
                  <small>Add one in Admin → Social</small>
                </div>
              )}
            </div>
          </div>
          <div className="social-column">
            <h3 className="social-column-title">TikTok</h3>
            <div className="social-column-inner">
              {tiktokEmbeds.length > 0 ? (
                tiktokEmbeds.map(renderTikTokCard)
              ) : (
                <div className="social-placeholder">
                  <p>No TikTok videos yet.</p>
                  <small>Add one in Admin → Social</small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialEmbedSection;
