import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../Store/productslice';
import { add } from '../Store/cartslice';
import Navbarr from './navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import Footerone from "../Footer/Footer";
import '../css/product1.css';

export default function Productlist() {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const { data: products } = useSelector(state => state.product);
  const [mainImage, setMainImage] = useState('');
  const [activeTab, setActiveTab] = useState("Description");

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const product = products.find(p => p.id === parseInt(productId));

  useEffect(() => {
    if (product) {
      setMainImage(product.image);
    }
  }, [product]);

  const addToCart = (product) => {
    dispatch(add(product));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  const images = product.images || [product.image];

  return (

    <>
    
    
    <div className="Productdetailspage">
      <Navbarr />

      <div className="detail-container">
        <nav className="breadcrumb">
          <a href="/">Home</a> / <span>{product.title}</span>
        </nav>

        <div className="product-detail">
         

<div className="product-images">
  {/* Desktop view: thumbnails + main image */}
  <div className="desktop-images">
    <div className="thumbnail-column">
      {images.map((img, idx) => (
        <img
          key={idx}
          src={img}
          alt={`Thumbnail ${idx + 1}`}
          className={`thumbnail ${mainImage === img ? "active" : ""}`}
          onClick={() => setMainImage(img)}
        />
      ))}
    </div>
    <div className="main-image-wrapper">
      <img src={mainImage} alt="Main Product" className="main-image" />
    </div>
  </div>

  {/* Mobile view: horizontal slider */}
  <div className="mobile-slider">
    {images.map((img, idx) => (
      <img
        key={idx}
        src={img}
        alt={`Slide ${idx + 1}`}
        className="slider-image"
        onClick={() => setMainImage(img)}
      />
    ))}
  </div>
</div>


          <div className="product-info">
            <h1>{product.title}</h1>
            <p>{product.description}</p>


            <div className="product-rating">
              <strong>Rating:</strong> {product.rating?.rate} ⭐
              <p className="price">₹{product.price}</p>
            </div>

            <div className="actions_wrraper">
              <div className="actions">



               

                <button onClick={() => addToCart(product)} className="product-button">
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                            </button>

                <button className="product-button"> <FontAwesomeIcon icon={faCreditCard} />  Buy Now</button>
              </div>
            </div>
          </div>
        </div>

        <div className="tabs">
          {["Description", "Specifications", "Shipping & Returns", "Warranty"].map(tab => (
            <button
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="tab-content">
          {activeTab === "Description" && <p>{product.description}</p>}
          {activeTab === "Specifications" && <p>Specifications details here.</p>}
          {activeTab === "Shipping & Returns" && <p>Shipping & Returns details here.</p>}
          {activeTab === "Warranty" && <p>Warranty details here.</p>}
        </div>
      </div>
    </div>
    <Footerone />
    </>
  );
}
