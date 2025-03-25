import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import signimg from '../images/signup-image.jpg';
import '../css/login.css';

import { CiLock } from "react-icons/ci";
import { HiOutlineMail } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

const Signup = () => {
  return (
    <div className="container cctv-sign-log-in d-flex ">
      <div className="signup-container shadow">
        <div className="row ">
            {/* Image Section */}
          <div className="col-md-6 image-section align-items-center justify-content-center">
            <img  src={signimg}  alt="Signup"  className="img-fluid" />
          </div>
          
          {/* Form Section */}
          <div className="col-md-6 form-section p-5 animate__animated animate__zoomIn">
            <h2 className="fw-bold mb-4">Sign up</h2>
            <form className="">
              <div className="mb-4 position-relative">
                <CgProfile className="position-absolute top-50 translate-middle-y fs-5 text-secondary "/>
                <input type="text" className="form-control ps-5 py-3" placeholder="Your Name" />
              </div>
              <div className="mb-4 position-relative">
                <HiOutlineMail className="position-absolute top-50 translate-middle-y fs-5 text-secondary ms-1" />
                <input type="email" className="form-control ps-5 py-3" placeholder="Your Email"/>
              </div>
              <div className="mb-4 position-relative">
              <CiLock className=" position-absolute top-50 translate-middle-y fs-5 text-black ms-1"/>
                <input type="password" className="form-control ps-5 py-3" placeholder="Password"/>
              </div>
              <div className="mb-4 position-relative">
              <CiLock className=" position-absolute top-50 translate-middle-y fs-5 text-black ms-1"/>
                <input type="password" className="form-control ps-5 py-3" placeholder="Repeat your password" />
              </div>
              <div className="mb-2 form-check">
                <input type="checkbox" className="form-check-input" id="termsCheck" />
                <label className="form-check-label small text-muted" htmlFor="termsCheck">
                  I agree all statements in <a href="#" >Terms of service</a>
                </label>
              </div>
              <p className="text-center mt-2 ">
                <a href="/signup" className=" small"> I am already a member </a>
              </p>
              <button className="btn btn-primary w-100 py-2 fw-bold">
                Register
              </button>
            </form>
          </div>

          
        </div>
      </div>
    </div>
  );
};

export default Signup;