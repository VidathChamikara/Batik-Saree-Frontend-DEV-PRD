import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginSignup from "./pages/LoginSignup";
import ShirtDesigner from "./pages/ShirtDesigner";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Landing />} />
        <Route path="/loginSignup" element={<LoginSignup />} />       
        <Route path="/shirt" element={<ShirtDesigner />} />
        {/* Other routes for your application */}
      </Routes>
    </Router>
  );
}

export default App;
