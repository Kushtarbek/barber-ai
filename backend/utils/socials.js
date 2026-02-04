function detectPlatform(url) {
  if (!url) return null;
  const lower = url.toLowerCase();
  if (lower.includes("instagram.com")) return "instagram";
  if (lower.includes("tiktok.com")) return "tiktok";
  return null;
}

function extractInstagramInfo(url) {
  const match = url.match(/instagram\.com\/(p|reel|tv)\/([^/?#]+)/i);
  if (!match) return null;
  return { type: match[1].toLowerCase(), shortcode: match[2] };
}

function extractTikTokId(url) {
  const match = url.match(/tiktok\.com\/.*\/video\/(\d+)/i);
  return match ? match[1] : null;
}

function buildEmbedUrl(url) {
  const platform = detectPlatform(url);
  if (platform === "instagram") {
    const info = extractInstagramInfo(url);
    if (!info) return null;
    const type = info.type === "reel" ? "reel" : info.type === "tv" ? "tv" : "p";
    return `https://www.instagram.com/${type}/${info.shortcode}/embed`;
  }
  if (platform === "tiktok") {
    const id = extractTikTokId(url);
    if (!id) return null;
    return `https://www.tiktok.com/embed/v2/${id}`;
  }
  return null;
}

module.exports = {
  detectPlatform,
  buildEmbedUrl,
};
