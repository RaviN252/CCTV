import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "./AdminCss/ProductList.css";
import ProductEditModal from "./ProductEditModal"; 


function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // <-- Add this
  const [showModal, setShowModal] = useState(false);   

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`, {
          method: "DELETE",
        });
        const result = await res.json();
        alert(result.message);
        fetchProducts(); // Refresh list
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  const handleUpdate = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  return (
    <>
      <Nav />
      <div className="product-container">
        <h2>Product List</h2>

        {loading ? (
          <p>Loading products...</p>
        ) : (
          <table className="product-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Description</th>
                <th>Images</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>{product.name}</td>
                  <td>₹{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.description?.substring(0, 100)}...</td>
                  <td className="product-images-cell">
                    {product.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={`http://localhost:5000/${img}`}
                        alt={`img-${idx}`}
                        className="product-img"
                      />
                    ))}
                  </td>
                  <td>
                  <button onClick={() => handleUpdate(product)} className="edit-btn">Edit</button>

                    <button onClick={() => handleDelete(product._id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}


<ProductEditModal
  show={showModal}
  product={selectedProduct}
  onClose={() => setShowModal(false)}
  onUpdate={fetchProducts}
/>

      </div>
    </>
  );
}

export default ProductList;
