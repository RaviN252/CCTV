import React, { useState } from "react";
import AdminNav from "./Nav";
import { FaUser, FaShoppingBag, FaShoppingCart, FaCreditCard, FaFileInvoiceDollar } from "react-icons/fa";
import "./AdminCss/Dashboard.css"; // Import styles

function Dashboard() {
  // Dummy data for dashboard stats
  const [stats, setStats] = useState({
    customers: 1250,
    products: 320,
    orders: 560,
    payments: 450,
    invoices: 210,
  });

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <AdminNav />

      {/* Main Content */}
      <div className="dashboard-content">
        <h2 className="dashboard-title">Admin Dashboard</h2>

        <div className="dashboard-grid">
          {/* Total Customers */}
          <div className="dashboard-card">
            <FaUser className="dashboard-icon user" />
            <h3>Total Customers</h3>
            <p>{stats.customers}</p>
          </div>

          {/* Total Products */}
          <div className="dashboard-card">
            <FaShoppingBag className="dashboard-icon product" />
            <h3>Total Products</h3>
            <p>{stats.products}</p>
          </div>

          {/* Total Orders */}
          <div className="dashboard-card">
            <FaShoppingCart className="dashboard-icon order" />
            <h3>Total Orders</h3>
            <p>{stats.orders}</p>
          </div>

          {/* Total Payments */}
          <div className="dashboard-card">
            <FaCreditCard className="dashboard-icon payment" />
            <h3>Total Payments</h3>
            <p>{stats.payments}</p>
          </div>

          {/* Total Invoices */}
          <div className="dashboard-card">
            <FaFileInvoiceDollar className="dashboard-icon invoice" />
            <h3>Total Invoices</h3>
            <p>{stats.invoices}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
