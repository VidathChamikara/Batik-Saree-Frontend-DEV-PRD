import React, { useState, useRef } from "react";
import { Spinner } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from "react-icons/fa";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

import log from "../images/Log.png";
import signup from "../images/Signup.png";
import "../css/style.css"; // Make sure to import your CSS file

function LoginSignupPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // State for loading spinner
  const formRef = useRef(null); // Ref for accessing the form element

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner
    fetch("https://distinct-suit-bass.cyclic.app/api/user/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username: formRef.current.username.value,
        email: formRef.current.email.value,
        password: formRef.current.password.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false); // Hide loading spinner
        if (data.status === "Already Registred") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Already Registered with this Email. Can not sign up again",
          });
        } else if (data.status === "ok") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Successfully Registered. Check your email. Login credentials are there.",
          }).then(() => {
            formRef.current.reset(); // Reset the form fields
          });
        }
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading spinner
    fetch("https://distinct-suit-bass.cyclic.app/api/user/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setIsLoading(false); // Hide loading spinner
        if (data.error === "Invalid Username") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Username.",
          });
        } else if (data.error === "Invalid Password") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid Password.",
          });
        } else if (data.status === "ok") {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Login Successful.",
            confirmButtonText: "OK",
          }).then((result) => {
            if (result.isConfirmed) {
              window.localStorage.setItem("token", data.data);
              window.localStorage.setItem("loggedIn", true);
              setRedirect(true); // Set redirect to true
            }
          });
        }
      });
  };

  if (redirect) {
    return <Navigate to="/Home" />;
  }

  return (
    <div className={`containerone ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSignIn}>
            <h2 className="title">Login</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Login" className="btn solid" />
            {isLoading && <Spinner animation="border" role="status" />}
            <p className="social-text">Connect with our social platforms</p>
            <div className="social-media">
              <a href="https://www.facebook.com" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://www.twitter.com" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://www.google.com" className="social-icon">
                <FaGoogle />
              </a>
              <a href="https://www.linkedin.com" className="social-icon">
                <FaLinkedinIn />
              </a>
            </div>
          </form>
          <form
            ref={formRef}
            action="#"
            className="sign-up-form"
            onSubmit={handleSignUp}
          >
            <h2 className="title">Register</h2>
            <div className="input-field">
              <i className="fa fa-user"></i>
              <input
                id="username"
                name="username"
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fa fa-envelope"></i>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-field">
              <i className="fa fa-lock"></i>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <input type="submit" className="btn" value="Register" />
            {isLoading && <Spinner animation="border" role="status" />}
            <p className="social-text">Connect with our social platforms</p>
            <div className="social-media">
              <a href="https://www.facebook.com" className="social-icon">
                <FaFacebookF />
              </a>
              <a href="https://www.twitter.com" className="social-icon">
                <FaTwitter />
              </a>
              <a href="https://www.google.com" className="social-icon">
                <FaGoogle />
              </a>
              <a href="https://www.linkedin.com" className="social-icon">
                <FaLinkedinIn />
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              Create an account to unlock exclusive offers and gain access to
              our wide range of textile products at Batik Saree.
            </p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Register
            </button>
          </div>
          <img src={signup} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Please login to access your account and explore our exclusive
              collection of fabrics and accessories.
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Login
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginSignupPage;
