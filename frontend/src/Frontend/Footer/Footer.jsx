import React, { useState } from 'react';
import '../css/footer.css';
import PaymentOptions from './Payment';
import { FaPhoneAlt } from "react-icons/fa";


const Footerone = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [openSection, setOpenSection] = useState(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  React.useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <footer className="kilimanjaro_area">
      <div className="foo_top_header_one section_padding_100_70">
        <div className="container-fluid px-3">
          <div className="row">
            {['About Us', 'Important Links', 'Store Explore', 'Quick Contact'].map((section, index) => (
              <div className="col-12 col-md-6 col-lg-3" key={index}>
                <div className="kilimanjaro_part">
                  <h5 onClick={() => isMobile && toggleSection(section)}>
                    {section}
                    {isMobile && <span className="toggle-icon">{openSection === section ? '-' : '+'}</span>}
                  </h5>
                  {(openSection === section || !isMobile) && (
                    <div>
                      {section === 'About Us' && (
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim sit est, ad tenetur expedita, minus cupiditate aspernatur eaque.</p>
                      )}
                      {section === 'Important Links' && (
                        <ul className="kilimanjaro_links">
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Terms & Conditions</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>About Licences</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Help & Support</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Privacy Policy</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Community & Forum</a></li>
                        </ul>
                      )}
                      {section === 'Store Explore' && (
                        <ul className="kilimanjaro_links">
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Banarasi saree</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Opara saree</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Silk Saree</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Gadwal sari</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Soft dhakai saree</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Ajrakh chanderi sarees</a></li>
                          <li><a href="#"><i className="fa fa-angle-right" aria-hidden="true"></i>Furnishing</a></li>
                        </ul>
                      )}
                      {section === 'Quick Contact' && (
                        <div>
                          <div className="kilimanjaro_single_contact_info">
                            <h5>Phone : </h5>
                            <p><FaPhoneAlt style={{fontSize:"14px"}}/>  <a href="#">+91 123456789</a>    <a href="#"><FaPhoneAlt style={{fontSize:"14px"}}/>  +91 123456789</a></p>
                          </div>
                          <div className="kilimanjaro_single_contact_info">
                            <h5>Email:</h5>
                            <p><a href="#">pskg@gmail.com</a> <br /><a href="#">pskg@gmail.com</a></p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        < PaymentOptions />
      </div>
      <div className="kilimanjaro_bottom_header_one section_padding_50 text-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <p>© All Rights Reserved by &nbsp; <a href="#">CCTV company<i className="fa fa-love"></i></a></p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footerone;