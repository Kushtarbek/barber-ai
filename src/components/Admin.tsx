import React, { useState, useEffect } from "react";

interface UploadedImage {
  id: string;
  title: string;
  type: "Men" | "Women";
  description: string;
  image: string; // base64 encoded
  uploadedAt: string;
}

const Admin: React.FC = () => {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    type: "Men" as "Men" | "Women",
    description: "",
    image: "",
  });
  const [previewUrl, setPreviewUrl] = useState<string>("");

  // Load images from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("galleryImages");
    if (stored) {
      setImages(JSON.parse(stored));
    }
  }, []);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setFormData({ ...formData, image: base64 });
        setPreviewUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.image) {
      alert("Please fill in all fields and upload an image");
      return;
    }

    const newImage: UploadedImage = {
      id: Date.now().toString(),
      title: formData.title,
      type: formData.type,
      description: formData.description,
      image: formData.image,
      uploadedAt: new Date().toLocaleString(),
    };

    const updatedImages = [...images, newImage];
    setImages(updatedImages);
    localStorage.setItem("galleryImages", JSON.stringify(updatedImages));

    // Reset form
    setFormData({ title: "", type: "Men", description: "", image: "" });
    setPreviewUrl("");
    alert("Image uploaded successfully!");
  };

  const handleDelete = (id: string) => {
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);
    localStorage.setItem("galleryImages", JSON.stringify(updatedImages));
    alert("Image deleted successfully!");
  };

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1>🖼️ Gallery Admin Panel</h1>
        <a href="/" className="back-link">
          ← Back to Website
        </a>
      </div>

      <div className="admin-content">
        {/* Upload Form */}
        <div className="admin-section">
          <h2>Upload New Haircut Photo</h2>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="form-group">
              <label htmlFor="title">Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Classic Fade - Modern Cut"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">Type *</label>
              <select id="type" name="type" value={formData.type} onChange={handleInputChange} required>
                <option value="Men">Men</option>
                <option value="Women">Women</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe this haircut style..."
                rows={4}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Upload Image *</label>
              <input type="file" id="image" accept="image/*" onChange={handleImageUpload} required />
              {previewUrl && (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" />
                </div>
              )}
            </div>

            <button type="submit" className="submit-btn">
              Upload Photo
            </button>
          </form>
        </div>

        {/* Uploaded Images */}
        <div className="admin-section">
          <h2>Uploaded Photos ({images.length})</h2>
          {images.length === 0 ? (
            <p className="empty-state">No custom images uploaded yet. The gallery will use default photos.</p>
          ) : (
            <div className="images-grid">
              {images.map((img) => (
                <div key={img.id} className="image-card">
                  <img src={img.image} alt={img.title} />
                  <div className="image-info">
                    <h4>{img.title}</h4>
                    <p className="image-type">{img.type}</p>
                    <p className="image-description">{img.description}</p>
                    <p className="image-date">Uploaded: {img.uploadedAt}</p>
                    <button className="delete-btn" onClick={() => handleDelete(img.id)}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
