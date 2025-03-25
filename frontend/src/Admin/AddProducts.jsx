import React, { useState } from "react";
import Nav from "./Nav";
import * as XLSX from "xlsx";
import "./AdminCss/AddProducts.css";

function AddProducts() {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    images: [],
  });

  const [previewImages, setPreviewImages] = useState([]);

  const handleChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    const validTypes = ["image/jpeg", "image/png"];
    const isValid = selectedFiles.every(file => validTypes.includes(file.type));

    if (!isValid) {
      alert("Only JPG and PNG files are allowed.");
      return;
    }

    if (selectedFiles.length > 5) {
      alert("You can only upload up to 5 images.");
      return;
    }

    const previews = selectedFiles.map(file => ({ file, url: URL.createObjectURL(file) }));

    setNewProduct({ ...newProduct, images: selectedFiles });
    setPreviewImages(previews);
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...newProduct.images];
    const updatedPreviews = [...previewImages];

    updatedFiles.splice(index, 1);
    updatedPreviews.splice(index, 1);

    setNewProduct({ ...newProduct, images: updatedFiles });
    setPreviewImages(updatedPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, price, category, description, images } = newProduct;

    if (!name || !price || !category || !description || images.length === 0) {
      return alert("Please fill in all fields and upload at least one image.");
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    images.forEach(img => formData.append("images", img));

    try {
      const response = await fetch("http://localhost:5000/api/products", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Product added successfully!");
        setNewProduct({ name: "", price: "", category: "", description: "", images: [] });
        setPreviewImages([]);
      } else {
        throw new Error("Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      alert("Failed to add product.");
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return alert("Please select an Excel file.");

    const reader = new FileReader();
    reader.onload = async (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      try {
        const response = await fetch("http://localhost:5000/api/products/bulk", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ products: jsonData }),
        });

        if (response.ok) {
          alert("Bulk products added successfully!");
        } else {
          throw new Error("Failed to import bulk products");
        }
      } catch (error) {
        console.error("Error adding bulk products:", error);
        alert("Failed to import bulk products.");
      }
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <Nav />
      <div className="products-container">
        <h2>Add New Product</h2>
        <form className="product-form" onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Product Name" value={newProduct.name} onChange={handleChange} />
          <input type="text" name="price" placeholder="Price" value={newProduct.price} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={newProduct.category} onChange={handleChange} />
          <input type="text" name="description" placeholder="Description" value={newProduct.description} onChange={handleChange} />
          <input type="file" accept="image/png, image/jpeg" multiple onChange={handleImageChange} />

          {previewImages.length > 0 && (
            <div className="image-preview-container">
              {previewImages.map((img, index) => (
                <div key={index} className="image-preview-box">
                  <img src={img.url} alt={`preview-${index}`} width={80} height={80} />
                  <button type="button" onClick={() => handleRemoveImage(index)}>Remove</button>
                </div>
              ))}
            </div>
          )}

          <button type="submit">Submit Product</button>
        </form>

        <h3>Import Bulk Products</h3>
        <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} className="file-upload" />
      </div>
    </>
  );
}

export default AddProducts;
