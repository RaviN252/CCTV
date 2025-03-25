import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import "./AdminCss/AdminNav.css";

const AdminNav = () => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const nav = useNavigate();

  return (
    <div>
      <div className="sidenav-navigation">
        <ul>
          <li>
            <Link to="/Dashboard">
              <span className="sidenav-icon"><i className="fas fa-house"></i></span>
              <span className="sidenav-title">Dashboard</span>
            </Link>
          </li>

          <li>
            <Link to="/RegistredUser">
              <span className="sidenav-icon"><i className="fas fa-user"></i></span>
              <span className="sidenav-title">Customers</span>
            </Link>
          </li>

          <li>
            <Link to="/Banners">
              <span className="sidenav-icon"><i className="fas fa-rectangle-ad"></i></span>
              <span className="sidenav-title">Banner</span>
            </Link>
          </li>

          {/* Dropdown Menu */}
          <li className={`dropdown ${openDropdown ? "active" : ""}`}>
            <button className="dropdown-toggle" onClick={() => setOpenDropdown(!openDropdown)}>
              <span className="sidenav-icon"><i className="fas fa-shopping-bag"></i></span>
              <span className="sidenav-title">Products</span>
              <i className={`fas ${openDropdown ? "fa-chevron-up" : "fa-chevron-down"} dropdown-arrow`}></i>
            </button>

            {openDropdown && (
              <ul className="dropdown-menu">
                <li><Link to="/AddProduct"><i className="fas fa-plus-circle"></i> Add Product</Link></li>
                <li><Link to="/ProductList"><i className="fas fa-list"></i> Product List</Link></li>
                {/* <li><Link to="/Category"><i className="fas fa-th-large"></i> Category</Link></li> */}
              </ul>
            )}
          </li>

          <li>
            <Link to="/Orders">
              <span className="sidenav-icon"><i className="fas fa-shopping-cart"></i></span>
              <span className="sidenav-title">Orders</span>
            </Link>
          </li>

          <li>
            <Link to="/Invoice">
              <span className="sidenav-icon"><i className="fas fa-file-invoice"></i></span>
              <span className="sidenav-title">Invoice</span>
            </Link>
          </li>

          <li>
            <button className="signout-btn" onClick={() => nav("/")}>
              <span className="sidenav-icon"><i className="fas fa-right-from-bracket"></i></span>
              <span className="sidenav-title">SignOut</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;
