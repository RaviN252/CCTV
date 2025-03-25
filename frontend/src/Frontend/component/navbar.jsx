import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav, Offcanvas, Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GrCart } from "react-icons/gr";
import { FaSearch, FaTimes, FaUserCircle } from "react-icons/fa";
import { CgProfile, CgChevronRight } from "react-icons/cg";
import "boxicons/css/boxicons.min.css";
import "../css/navication.css";
import Logo from '../images/Logo.png';

const Navbarr = () => {
  const [darkMode, setDarkMode] = useState(localStorage.getItem("mode") === "dark-mode");
  const [searchActive, setSearchActive] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const cartproduct = useSelector(state => state.cart);
  const products = useSelector(state => state.product?.data || []);

  useEffect(() => {
    document.body.className = darkMode ? "dark" : "";
    localStorage.setItem("mode", darkMode ? "dark-mode" : "");
  }, [darkMode]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) setShowMobileMenu(false);
  }, [isMobile]);

  const handleCartClick = () => navigate('/cart');

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
        <div className="mb-5">
      <Navbar expand="lg" fixed="top" className={`${darkMode ? "dark-nav" : ""} main-nav `}>
        <Container fluid className="px-4 ">
          <Navbar.Brand href="/" className="text-dark fw-bold">
            <img src={Logo} className="Logo-img"/>
          </Navbar.Brand>

          {isMobile && (
            <div className="d-flex align-items-center gap-3 mx-auto">
              <Nav.Link onClick={() => setSearchActive(!searchActive)} className="p-0">
                {searchActive ? <FaTimes className="text-dark fs-5" /> : <FaSearch className="text-dark fs-5" />}
              </Nav.Link>
              <Nav.Link className="p-0" onClick={handleCartClick}>
                <span className="text-dark"><GrCart className="text-dark fs-5" />{cartproduct.length}</span>
              </Nav.Link>
            </div>
          )}

          <div className="d-flex align-items-center gap-3">
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-center d-none d-lg-flex">
              <Nav className="gap-4">
                {["Home", "Products", "Quotation"].map((item) => (
                  <Nav.Link key={item} href="/" className="text-dark position-relative nav-item">
                    {item}
                    {/* <span className="nav-dot"></span> */}
                  </Nav.Link>
                ))}
              </Nav>
            </Navbar.Collapse>

            {/* Desktop Cart + Search + Profile */}
            {!isMobile && (
              <Nav className="align-items-center gap-3">
                {/* Cart Icon */}
                <Nav.Link onClick={handleCartClick} className="p-0 d-none d-lg-block">
                  <span className="text-dark"><GrCart className="text-dark fs-5" />{cartproduct.length}</span>
                </Nav.Link>

                {/* Search */}
                <div className="position-relative d-none d-lg-block">
                  <Nav.Link className="p-0 ms-2" onClick={() => setSearchActive(!searchActive)}>
                    {searchActive ? <FaTimes className="text-dark fs-5" /> : <FaSearch className="text-dark fs-5" />}
                  </Nav.Link>

                  {searchActive && (
                    <div className="search-field position-absolute end-0">
                      <input
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="form-control"
                      />
                      {searchQuery && (
                        <div className="suggestions-dropdown">
                          {filteredProducts.map(product => (
                            <div
                              key={product.id}
                              className="suggestion-item"
                              onClick={() => {
                                navigate(`/Productlist/${product.id}`);
                                setSearchQuery('');
                                setSearchActive(false);
                              }}
                            >
                              {product.title}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Profile Dropdown */}
                <Dropdown align="end" className="d-none d-lg-block">
                  <Dropdown.Toggle variant="transparent" className="p-0 ms-2">
                    <CgProfile className="text-dark fs-4 profile-icon" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="mt-4 dropdown-menu-custom">
                    <div className="pt-4 px-2">
                      <div className="d-flex align-items-center gap-4 mb-4 px-0">
                        <FaUserCircle className="text-secondary" style={{ fontSize: "3.5rem" }} />
                        <div>
                          <b className="mb-1 fs-5">Welcome to PSKG</b>
                          <div className="d-flex align-items-center gap-3">
                            <Link to="/signup" className="text-primary text-decoration-none">Sign up</Link>
                            <span className="text-muted">|</span>
                            <Link to="/signin" className="text-primary text-decoration-none">Sign in</Link>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <Dropdown.Divider />
                    {["Profile", "Settings", "Orders", "Account"].map((item) => (
                      <Dropdown.Item
                        key={item}
                        href="#"
                        className="px-4 py-3 fs-5 d-flex justify-content-between align-items-center"
                      >
                        <span>{item}</span>
                        <CgChevronRight className="ms-2" />
                      </Dropdown.Item> 
                    ))}*/}
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            )}

            {/* Toggle (Mobile) */}
            <Navbar.Toggle
              aria-controls="offcanvas-navbar"
              className="border-0 d-lg-none"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              <i className="bx bx-menu text-dark h3 mb-0"></i>
            </Navbar.Toggle>
          </div>

          {/* Offcanvas (Mobile Menu) */}
          {isMobile && (
            <Navbar.Offcanvas
              id="offcanvas-navbar"
              placement="end"
              show={showMobileMenu}
              onHide={() => setShowMobileMenu(false)}
              className="dark-mode-offcanvas"
            >
              <Offcanvas.Header closeButton className="text-dark" style={{ backgroundColor: '#170C64' }}>
                <div className="d-flex align-items-center gap-3">
                  <Nav.Link className="p-0" onClick={handleCartClick}>
                    <span className="text-dark"><GrCart className="text-dark fs-5" />{cartproduct.length}</span>
                  </Nav.Link>
                  <Nav.Link className="p-0" onClick={() => setSearchActive(!searchActive)}>
                    {searchActive ? <FaTimes className="text-dark fs-5" /> : <FaSearch className="text-dark fs-5" />}
                  </Nav.Link>
                </div>
              </Offcanvas.Header>

              <Offcanvas.Body>
                <Nav className="flex-column gap-3">
                  {["Home", "Products", "Quotation"].map((item) => (
                    <Nav.Link key={item} href="#" className="text-dark" onClick={() => setShowMobileMenu(false)}>
                      {item}
                    </Nav.Link>
                  ))}
                </Nav>

                <div className="mt-4 border-top pt-4 px-4">
                  <div className="d-flex align-items-center gap-4 mb-4">
                    <FaUserCircle className="text-secondary" style={{ fontSize: "4rem" }} />
                    <div>
                      <h4 className="mb-1">Welcome to PSKG</h4>
                      <div className="d-flex align-items-center gap-2">
                        <Link to="/signup" className="text-dark text-decoration-none">Sign up</Link>
                        <span className="text-muted">|</span>
                        <Link to="/signin" className="text-dark text-decoration-none">Sign in</Link>
                      </div>
                    </div>
                  </div>

                  {/* <Nav className="flex-column gap-2 mt-3">
                    {["Profile", "Settings", "Orders", "Account"].map((item) => (
                      <Nav.Link key={item} href="#" className="d-flex justify-content-between align-items-center px-0">
                        <span>{item}</span>
                        <CgChevronRight />
                      </Nav.Link>
                    ))}
                  </Nav> */}
                </div>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          )}
        </Container>
      </Navbar>
      </div>


      {/* Mobile Search Bar */}
      {isMobile && searchActive && (
        <div className="mobile-search-container fixed-top" style={{ top: '56px', zIndex: 1040 }}>
          <div className="position-relative">
            <input
              type="text"
              placeholder="Search products..."
              className="form-control rounded-0 border-0 px-4 py-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            {searchQuery && (
              <div className="suggestions-dropdown bg-white shadow">
                {filteredProducts.map(product => (
                  <div
                    key={product.id}
                    className="suggestion-item px-4 py-2"
                    onClick={() => {
                      navigate(`/Productlist/${product.id}`);
                      setSearchQuery('');
                      setSearchActive(false);
                    }}
                  >
                    {product.title}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
     
    </>
  );
};

export default Navbarr;
