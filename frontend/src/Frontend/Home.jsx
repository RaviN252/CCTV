import React from "react";
import Navbarr from "./component/navbar";
import Product from "./component/Product";
import Secure from "./Secure/Secure";
// import Banner from "./Banner/Banner";
import ContactUs from "./Contact/contact";
import Footerone from "./Footer/Footer";
import FCarousel from "./Banner/Fcarousel";

export default function Home() {
  return (
    <>
      <Navbarr />
      {/* <Banner /> */}

     <FCarousel/>
      <Product />
      <Secure />
      <ContactUs />
      <Footerone />
    </>
  );
}
