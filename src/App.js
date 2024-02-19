import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginSignup from "./pages/LoginSignup";
import Home from "./pages/Home";
import ShirtDesigner from "./pages/ShirtDesigner";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shirt" element={<ShirtDesigner />} />
        {/* Other routes for your application */}
      </Routes>
    </Router>
  );
}

export default App;
