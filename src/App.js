import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

//Components
import GeneralNav from "./components/GeneralNav";
import ShirtDesigner from "./pages/ShirtDesigner";

//Pages
import Landing from "./pages/Landing";
import LoginSignup from "./pages/LoginSignup";
import UserDetails from "./pages/userDetails";
import GeneralHome from "./pages/GeneralHome";
import AdminHome from "./pages/AdminHome";

// Define PrivateRoute component for protecting routes
const PrivateRoute = ({ element, ...rest }) => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  
  // Redirect to login page if not logged in
  if (isLoggedIn !== "true") {
    return <Navigate to="/loginSignup" />;
  }

  // Otherwise, render the specified element
  return React.cloneElement(element, rest);
};

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />

        {/* Modify loginSignup route */}
        <Route
          path="/loginSignup"
          element={
            isLoggedIn === "true" ? (
              <Navigate to="/Home" replace />
            ) : (
              <LoginSignup />
            )
          }
        />

        {/* Protected routes */}
        <Route path="/generalHome" element={<PrivateRoute element={<GeneralHome />} />} />
        <Route path="/adminHome" element={<PrivateRoute element={<AdminHome />} />} />
        <Route path="/Home" element={<PrivateRoute element={<UserDetails />} />} />

        {/* Public routes */}
        <Route path="/shirt" element={<ShirtDesigner />} />
        <Route path="/generalNav" element={<GeneralNav />} />
      </Routes>
    </Router>
  );
}

export default App;
