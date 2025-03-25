import React, { useState } from "react";
import Nav from "./Nav";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./AdminCss/Invoice.css";

const Invoice = () => {
  // State for Customer & Invoice Details
  const [invoice, setInvoice] = useState({
    invoiceNumber: `INV-${Math.floor(100000 + Math.random() * 900000)}`, // Generate random invoice number
    date: new Date().toLocaleDateString(),
    customerName: "",
    customerAddress: "",
    tax: 0, // Default No Tax
    shipping: 100, // Default shipping fee
  });

  // State for Product List
  const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);

  // Handle Input Changes
  const handleInputChange = (e) => {
    setInvoice({ ...invoice, [e.target.name]: e.target.value });
  };

  // Handle Tax Change from Dropdown
  const handleTaxChange = (e) => {
    setInvoice({ ...invoice, tax: parseFloat(e.target.value) });
  };

  // Handle Product Change
  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...products];
    updatedProducts[index][field] = value;
    setProducts(updatedProducts);
  };

  // Add New Product Row
  const addProduct = () => {
    setProducts([...products, { name: "", quantity: 1, price: 0 }]);
  };

  // Remove Product Row
  const removeProduct = (index) => {
    const updatedProducts = products.filter((_, i) => i !== index);
    setProducts(updatedProducts);
  };

  // Generate Invoice PDF
  const generatePDF = () => {
    const doc = new jsPDF();

    // Invoice Title
    doc.setFontSize(22);
    doc.text("Invoice - PAID", 105, 20, null, null, "center");

    // Invoice Details
    doc.setFontSize(12);
    doc.text(`Invoice No: ${invoice.invoiceNumber}`, 15, 40);
    doc.text(`Date: ${invoice.date}`, 15, 50);
    doc.text(`Customer: ${invoice.customerName}`, 15, 60);
    doc.text(`Address: ${invoice.customerAddress}`, 15, 70);

    // Define Table Columns & Rows
    const tableColumn = ["Item", "Quantity", "Unit Price", "Total"];
    const tableRows = products.map(item => [
      item.name,
      item.quantity,
      `₹${item.price}`,
      `₹${item.quantity * item.price}`,
    ]);

    // ✅ Use autoTable
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 80,
    });

    // Total Amount Calculation
    const totalAmount = products.reduce((acc, item) => acc + item.quantity * item.price, 0);
    const taxAmount = (totalAmount * invoice.tax) / 100;
    const finalAmount = totalAmount + taxAmount + parseInt(invoice.shipping);

    doc.text(`Subtotal: ₹${totalAmount}`, 15, doc.lastAutoTable.finalY + 10);
    doc.text(`Tax (${invoice.tax}%): ₹${taxAmount.toFixed(2)}`, 15, doc.lastAutoTable.finalY + 20);
    doc.text(`Shipping: ₹${invoice.shipping}`, 15, doc.lastAutoTable.finalY + 30);
    doc.text(`Total: ₹${finalAmount.toFixed(2)}`, 15, doc.lastAutoTable.finalY + 40);

    // Save PDF
    doc.save(`Invoice-${invoice.invoiceNumber}.pdf`);
  };

  return (
    <>
      <Nav />
      <div className="invoice-container">
        <h2>Create Invoice</h2>

        {/* Invoice Form */}
        <div className="invoice-form">
          <input type="text" name="customerName" placeholder="Customer Name" value={invoice.customerName} onChange={handleInputChange} />
          <input type="text" name="customerAddress" placeholder="Customer Address" value={invoice.customerAddress} onChange={handleInputChange} />

          {/* Tax Dropdown */}
          <select name="tax" value={invoice.tax} onChange={handleTaxChange}>
            <option value="0">No Tax (0%)</option>
            <option value="12">12% GST</option>
            <option value="18">18% GST</option>
            <option value="20">20% GST</option>
          </select>

          <input type="number" name="shipping" placeholder="Shipping Charges" value={invoice.shipping} onChange={handleInputChange} />
        </div>

        {/* Product Table Input */}
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={index}>
                <td>
                  <input type="text" value={item.name} onChange={(e) => handleProductChange(index, "name", e.target.value)} placeholder="Product Name" />
                </td>
                <td>
                  <input type="number" value={item.quantity} onChange={(e) => handleProductChange(index, "quantity", parseInt(e.target.value))} />
                </td>
                <td>
                  <input type="number" value={item.price} onChange={(e) => handleProductChange(index, "price", parseInt(e.target.value))} />
                </td>
                <td>₹{item.quantity * item.price}</td>
                <td>
                  {products.length > 1 && <button className="remove-btn" onClick={() => removeProduct(index)}>❌</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Add Product Button */}
        <button className="add-btn" onClick={addProduct}>➕ Add Product</button>

        {/* Generate PDF Button */}
        <button className="download-btn" onClick={generatePDF}>
          Generate Invoice PDF
        </button>
      </div>
    </>
  );
};

export default Invoice;
