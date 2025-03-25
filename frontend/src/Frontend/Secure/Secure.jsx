import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import "../css/secure.css";


const Secure = () => {
   
  return (
    <div className="">
         {/* Feature Section */}
      <div className="container-fluid feature  pb-5">
        
          <div className="text-center mx-auto pb-5 container-head  animate__animated animate__fadeInUp wow fadeInUp" data-wow-delay="0.2s" style={{ maxWidth: "800px" }}>
          <div className="mb-4 section-content" >
              <h1 className=" mb-0" >Full - Spectrum Security Services</h1>
              <p>Are you looking for a reliable and affordable security service for your home or business? Contact us today for a free consultation and quote.</p>
            </div>
          
          </div>
          <div className="row g-4">
            {features.map((feature, index) => (
              <div className="col-md-6 col-lg-6 col-xl-3 animate__animated animate__fadeInUp wow fadeInUp " data-wow-delay={`${0.5 * (index + 1)}s`} key={index}>
                <div className="feature-item  p-4 pt-0">
                  <div className="feature-icon p-4 mb-4">
                    <i className={`${feature.icon} fa-3x`}></i>
                  </div>
                  <h4 className="mb-4">{feature.title}</h4>
                  
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

   
  );
};

const features = [
    { icon: "fa fa-bullseye", title: "Access Control & Biometric Systems" },
    { icon: "fa fa-bullseye", title: "AI-Based Facial Recognition Systems" },
    { icon: "fa fa-bullseye", title: "High-Definition CCTV & IP Cameras" },
    { icon: "fa fa-headphones", title: "Custom Security Solutions  Businesses" },
  ];
export default Secure;
