import React from "react";
import { BrowserRouter , Routes, Route } from "react-router-dom";
// import { BrowserRouter } from "react-router-dom";
import SignIn from "./front/SignIn";
import SignUp from "./front/SignUp";
import Home from "./front/Home";

function App() {
  return (
     <BrowserRouter>
    
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
 
    </BrowserRouter>
  );
}

export default App;
