import React, { useState, useEffect } from "react";
import "./AdminCss/ProductEditModal.css";

function ProductEditModal({ show, product, onClose, onUpdate }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
  });

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        category: product.category || "",
        description: product.description || "",
      });
      setExistingImages(product.images || []);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setNewImages([...e.target.files]);
  };

  const handleRemoveExistingImage = (imgToRemove) => {
    setExistingImages((prev) => prev.filter((img) => img !== imgToRemove));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    payload.append("name", formData.name);
    payload.append("price", formData.price);
    payload.append("category", formData.category);
    payload.append("description", formData.description);

    // Send the remaining existing images as JSON string
    payload.append("existingImages", JSON.stringify(existingImages));

    // Attach new images
    newImages.forEach((img) => {
      payload.append("images", img);
    });

    try {
      const res = await fetch(`http://localhost:5000/api/products/${product._id}`, {
        method: "PUT",
        body: payload,
      });

      const result = await res.json();
      alert(result.message);
      onUpdate();
      onClose();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  if (!show) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-box">
        <h3>Edit Product</h3>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label>
            Name:
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </label>
          <label>
            Price:
            <input type="number" name="price" value={formData.price} onChange={handleChange} required />
          </label>
          <label>
            Category:
            <input type="text" name="category" value={formData.category} onChange={handleChange} required />
          </label>
          <label>
            Description:
            <textarea name="description" value={formData.description} onChange={handleChange} required />
          </label>

          <label>
            Existing Images:
            <div className="edit-images-preview">
              {existingImages.map((img, i) => (
                <div key={i} className="image-with-remove">
                  <img
                    src={`http://localhost:5000/${img}`}
                    alt={`product-${i}`}
                    className="edit-preview-img"
                  />
                  <button type="button" onClick={() => handleRemoveExistingImage(img)} className="remove-img-btn">
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </label>

          <label>
            Upload New Images:
            <input type="file" multiple accept="image/*" onChange={handleImageChange} />
          </label>

          <div className="modal-buttons">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductEditModal;
