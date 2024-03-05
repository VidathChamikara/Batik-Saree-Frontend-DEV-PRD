import React, { useEffect, useState } from "react";
import UserHome from "./userHome";
import AdminHome from "./AdminHome";
import FuelStationHome from "./FuelStationHome";

const UserDetails = () => {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);
  const [generalUser, setGeneralUser] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/user/userData", {
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
        if (data.data.userType === "Admin") {
          setAdmin(true);
        }
        if (data.data.userType === "General User") {
          setGeneralUser(true);
        }
        setUserData(data.data);
        if (data.data === "token expired") {
          alert("Token expired. Please log in again.");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  return (
    <div>
      {admin ? (
        <AdminHome />
      ) : generalUser ? (
        <FuelStationHome />
      ) : (
        <UserHome />
      )}
    </div>
  );
};

export default UserDetails;
