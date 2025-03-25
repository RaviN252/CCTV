import { useState, useRef } from 'react';
import '../css/carts.css';
import { useSelector, useDispatch } from "react-redux";
import { remove, updateQuantity } from '../Store/cartslice';
import '../css/product1.css';
import { RiDeleteBinFill } from "react-icons/ri";
import { FaRupeeSign } from "react-icons/fa";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Navbarr from './navbar';

const Cart = () => {
  const products = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const cartRef = useRef();

  const removeToCart = (id) => {
    dispatch(remove(id));
  };

  const handleQuantityChange = (id, type) => {
    const product = products.find(p => p.id === id);
    if (product) {
      let newQuantity = product.quantity || 1;
      if (type === "increment") {
        newQuantity += 1;
      } else if (type === "decrement" && newQuantity > 1) {
        newQuantity -= 1;
      }
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const totalCartPrice = products.reduce((acc, product) => acc + (product.price * (product.quantity || 1)), 0).toFixed(2);

  // const handleDownloadPDF = () => {
  //   const invoiceElement = document.getElementById('invoice-section');
  //   if (!invoiceElement) return;

  //   html2canvas(invoiceElement, {
  //     scale: 2,
  //     useCORS: true,
  //     backgroundColor: '#fff',
  //   }).then((canvas) => {
  //     const imgData = canvas.toDataURL('image/png');
  //     const pdf = new jsPDF('p', 'mm', 'a4');
  //     const imgProps = pdf.getImageProperties(imgData);
  //     const pdfWidth = pdf.internal.pageSize.getWidth();
  //     const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
  //     pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  //     pdf.save('invoice.pdf');
  //   });
  // };



  const handleDownloadPDF = () => {
    const invoiceElement = document.getElementById('invoice-section');
    if (!invoiceElement) return;
  
    // Temporarily show the element if it's hidden
    invoiceElement.style.display = 'block';
  
    html2canvas(invoiceElement, {
      scale: 2,
      useCORS: true,
      backgroundColor: '#fff',
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/jpeg', 1.0); // ✅ use 'jpeg'
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight); // ✅ use JPEG explicitly
      pdf.save('invoice.pdf');
    }).catch((err) => {
      console.error('PDF generation failed:', err);
    });
    
  };
  





  const cards = products.map(product => {
    const totalPrice = (product.price * (product.quantity || 1)).toFixed(2);

    return (
      <div className="cart-item cart-container" key={product.id}>
        <div className="cart-item-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="cart-item-details me-5">
          <b className="cart-item-title">{product.title}</b>
        </div>
        <div className="cart-item-quantity d-flex">
          <div>
            <p className="cart-item-price me-2 mt-2"><FaRupeeSign />{product.price}</p>
          </div>
          <div className="quantity-section mx-3">
            <button onClick={() => handleQuantityChange(product.id, "decrement")}>-</button>
            <input type="number" className="quantity-input" value={product.quantity || 1} readOnly />
            <button onClick={() => handleQuantityChange(product.id, "increment")}>+</button>
          </div>
          <div>
            <p className="cart-item-price mt-3"><FaRupeeSign />{totalPrice}</p>
          </div>
        </div>
        <div className="cart-item-actions">
          <button className="remove-item" onClick={() => removeToCart(product.id)}>
            Remove <RiDeleteBinFill className="delete-icon" />
          </button>
        </div>
      </div>
    );
  });

  return (
    <>
    

 <div className="cart-container container-fluid">
  <Navbarr />

  <div className='row'>
    {/* ✅ Wrap only this section for PDF */}
    <div ref={cartRef} className="col-md-9 pdf-content">
      <h2>Shopping Cart</h2>
      {products.length === 0 ? (
        <p className="text-muted">Your cart is empty.</p>
      ) : (
        cards
      )}
    </div>

    <div className="cart-summary col-md-3">
      <div className="cart-totals-container">
        <h5>Cart Totals</h5>
        <table className="table">
          <tbody>
            <tr>
              <td className='d-flex'>
                <strong>Shipping</strong>
                <p className='ms-3'>Free shipping<br />Shipping options will be updated during checkout.</p>
              </td>
            </tr>
            <tr className='d-flex'>
              <td>Subtotal<br />(estimated for India)</td>
              <td>₹ {totalCartPrice}</td>
            </tr>
            <tr className='d-flex'>
              <td><strong>Total Cost</strong></td>
              <td><strong>₹ {totalCartPrice}</strong></td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-primary btn-block">Proceed to checkout</button>
        <button className="btn btn-link btn-block" onClick={handleDownloadPDF}>Download Cart as PDF</button>
      </div>
    </div>
  </div>
</div>


      {/* Hidden invoice section for PDF */}
      <div style={{ display: 'none' }}>
        <div id="invoice-section" ref={cartRef} style={{ padding: '20px', fontFamily: 'Arial' }}>
          <div style={{ textAlign: 'center', marginBottom: '20px' }}>
            <img src="/logo.png" alt="Logo" style={{ height: '60px' }} />
            <h2>Invoice</h2>
          </div>

          {products.map(product => (
            <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span>{product.title}</span>
              <span>Qty: {product.quantity || 1}</span>
              <span>₹ {(product.price * (product.quantity || 1)).toFixed(2)}</span>
            </div>
          ))}

          <hr />

          <div style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '16px' }}>
            Total: ₹ {totalCartPrice}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
