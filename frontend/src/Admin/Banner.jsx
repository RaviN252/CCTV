import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import "./AdminCss/Banner.css";

function AdBanner() {
  const [banners, setBanners] = useState([]);
  const [newBanner, setNewBanner] = useState({ image: null, header: "", content: "" });

  // Load banners from API
  useEffect(() => {
    fetch("http://localhost:5000/api/banners")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched banners from API:", data);
        setBanners(data);
      })
      .catch((err) => {
        console.error("Error fetching banners:", err);
      });
  }, []);

  const handleChange = (e) => {
    setNewBanner({ ...newBanner, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setNewBanner({ ...newBanner, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", newBanner.header);
    formData.append("description", newBanner.content);
    formData.append("image", newBanner.image);

    fetch("http://localhost:5000/api/banners", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setBanners([...banners, data.banner]);
        setNewBanner({ image: null, header: "", content: "" });
      })
      .catch((err) => console.error("Error adding banner:", err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/banners/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBanners(banners.filter((banner) => banner._id !== id));
      })
      .catch((err) => console.error("Error deleting banner:", err));
  };

  return (
    <>
      <Nav />
      <div className="banner-container">
        <h3>Add New Banner</h3>
        <form className="banner-form" onSubmit={handleSubmit} encType="multipart/form-data">
     
          <input type="text" name="header" placeholder="Banner Header" value={newBanner.header} onChange={handleChange} />
          <input type="text" name="content" placeholder="Banner Content" value={newBanner.content} onChange={handleChange} />
          <input type="file" name="image" accept="image/*" onChange={handleFileChange} />
          <button type="submit">Add Banner</button>
        </form>

        <h2>Banner Management</h2>
        <table className="banner-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Header</th>
              <th>Content</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((banner) => (
              <tr key={banner._id}>
                <td>
                {banner.images && banner.images.length > 0 ? (
  <img src={`http://localhost:5000${banner.images[0]}`} alt="banner" className="banner-img" />
) : (
  <span>No image</span>
)}

                </td>
                <td>{banner.name}</td>
                <td>{banner.description}</td>
                <td>
                  <button onClick={() => handleDelete(banner._id)} className="delete-btn">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default AdBanner;
