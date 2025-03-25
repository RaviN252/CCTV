import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../Store/cartslice';
import { getProducts } from '../Store/productslice';
import { useNavigate } from 'react-router-dom';
import '../css/product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const Product = () => {
    const dispatch = useDispatch();
    const { data: products } = useSelector(state => state.product);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const productsPerPage = useRef(12);

    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch]);

    useEffect(() => {
        const updateProductsPerPage = () => {
            productsPerPage.current = window.innerWidth <= 768 ? 10 : 12;
        };
        window.addEventListener('resize', updateProductsPerPage);
        updateProductsPerPage();
        return () => window.removeEventListener('resize', updateProductsPerPage);
    }, []);

    const addToCart = (product) => {
        dispatch(add(product));
    };

    const handleProductClick = (productId) => {
        navigate(`/Productlist/${productId}`);
    };

    const totalPages = Math.ceil(products.length / productsPerPage.current);
    const startIndex = currentPage * productsPerPage.current;
    const visibleProducts = products.slice(startIndex, startIndex + productsPerPage.current);

    const cards = visibleProducts.map(product => (
        <div key={product.id} className='ProductCard-main col-md-4'>
            <div className="product-card">
                <div className="product-image">
                    <img src={product.image} alt={product.title} />
                    <span className="product-tag">PSKG</span>
                </div>
                <div className="product-content">
                    <h3 className="product-title" onClick={() => handleProductClick(product.id)}>{product.title}</h3>
                    <div className="product-rating">
                        {product.rating.rate} <span>({product.rating.count} reviews)</span>
                    </div>
                    <div className="product-footer">
                        <p className="product-price">₹{product.price}</p>
                        <div className="product-buttons">
                        <button onClick={() => handleProductClick(product.id)} className="product-button secondary">
                       <i className="fas fa-eye" style={{ marginRight: '6px' }}></i>
                       Quick View
                       </button>

                            <button onClick={() => addToCart(product)} className="product-button">
                                <FontAwesomeIcon icon={faCartShopping} /> Add to Cart
                            </button>
                            

                        </div>
                    </div>
                </div>
            </div>
        </div>
    ));

    return (
        <div className='container product-card-container'>
            {/* <h1>Product Dashboard</h1> */}
            <div className="row">
                {cards}
            </div>
            <div className="product-navigation">
                <button disabled={currentPage === 0} onClick={() => setCurrentPage(prev => prev - 1)}>Previous</button>
                {Array.from({ length: totalPages }, (_, idx) => (
                    <button key={idx} onClick={() => setCurrentPage(idx)} className={currentPage === idx ? 'active' : ''}>
                        {idx + 1}
                    </button>
                ))}
                <button disabled={currentPage >= totalPages - 1} onClick={() => setCurrentPage(prev => prev + 1)}>Next</button>
            </div>
        </div>
    );
};

export default Product;
