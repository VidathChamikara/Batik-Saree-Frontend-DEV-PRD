import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

//Components
import GeneralNav from "./components/GeneralNav";
import ShirtDesigner from "./pages/ShirtDesigner";

//Pages
import Landing from "./pages/Landing";
import LoginSignup from "./pages/LoginSignup";
import UserDetails from "./pages/userDetails";
import GenaralHome from "./pages/GeneralHome";
import AdminHome from "./pages/AdminHome";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Landing />} />
        <Route exact path="/loginSignup" element={isLoggedIn=="true"?<UserDetails/>:<LoginSignup/>} />
        <Route path="/loginSignup" element={<LoginSignup />} />
        <Route path="/generalHome" element={<GenaralHome />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/userDetails" element={<UserDetails />} />

        <Route path="/shirt" element={<ShirtDesigner />} />
        <Route path="/generalNav" element={<GeneralNav />} />
      </Routes>
    </Router>
  );
}

export default App;
