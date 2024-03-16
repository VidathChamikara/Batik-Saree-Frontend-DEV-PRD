import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

//Components
import GeneralNav from "./components/GeneralNav";
import SareeDesigner from "./pages/SareeDesigner";

//Pages
import Landing from "./pages/Landing";
import LoginSignup from "./pages/LoginSignup";
import UserDetails from "./pages/userDetails";
import GeneralHome from "./pages/GeneralHome";
import AdminHome from "./pages/AdminHome";
import Kandyan from "./pages/Kandyan";
import KandyanAdmin from "./pages/KandyanAdmin";

// Define PrivateRoute component for protecting routes
const PrivateRoute = ({ element, userType, ...rest }) => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const storedUserType = window.localStorage.getItem("userType");

  // Redirect to login page if not logged in
  if (isLoggedIn !== "true") {
    return <Navigate to="/loginSignup" />;
  }

  // Check user type
  if (userType === "general" && storedUserType !== "General User") {
    return <Navigate to="/generalHome" />;
  } else if (userType === "admin" && storedUserType !== "Admin") {
    return <Navigate to="/adminHome" />;
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
        <Route
          path="/generalHome"
          element={
            <PrivateRoute element={<GeneralHome />} userType="general" />
          }
        />
        <Route
          path="/adminHome"
          element={<PrivateRoute element={<AdminHome />} userType="admin" />}
        />
        <Route
          path="/kandyanAdmin"
          element={<PrivateRoute element={<KandyanAdmin />} userType="admin" />}
        />
        <Route
          path="/Home"
          element={<PrivateRoute element={<UserDetails />} />}
        />

        {/* Public routes */}
        <Route path="/kandyan" element={<Kandyan />} />
        <Route path="/saree" element={<SareeDesigner />} />
        <Route path="/generalNav" element={<GeneralNav />} />
      </Routes>
    </Router>
  );
}

export default App;
