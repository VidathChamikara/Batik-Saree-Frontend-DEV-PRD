import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import GenaralHome from "./GeneralHome";
import AdminHome from "./AdminHome";
import Swal from "sweetalert2";

const UserDetails = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tokenExpired, setTokenExpired] = useState(false); // State for token expiration

  useEffect(() => {
    fetch("https://batik-saree-backend.vercel.app/api/user/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        window.localStorage.setItem("userType", data.data.userType);
        if (data.data.userType === "Admin") {          
          setAdmin(true);
        }        
        setUserData(data.data);
        setLoading(false);
        if (data.data === "token expired") {
          setTokenExpired(true); // Set tokenExpired state to true
        }
      });
  }, []);

  // Render alert message if token is expired
  if (tokenExpired) {
    Swal.fire({
      icon: 'error',
      title: 'Token Expired',
      text: 'Token expired. Please log in again.',
      confirmButtonText: 'OK'
    }).then((result) => {
      if (result.isConfirmed) {
        window.localStorage.clear();
        window.location.href = "./loginSignup";
      }
    });
    return null; // Return null to prevent rendering anything else
  }

  // Render spinner while data is being fetched
  if (loading) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  // Render based on user type after data is fetched
  return (
    <div>
      {admin ? (
        <AdminHome />
      ) : (
        <GenaralHome userName={userData.username} />
      )}
    </div>
  );
};

export default UserDetails;
