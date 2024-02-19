import React from "react";
import { useState } from "react";
import log from "../images/Log.png";
import signup from "../images/Signup.png";
import "../css/style.css"; // Make sure to import your CSS file
import { FaFacebookF, FaTwitter, FaGoogle, FaLinkedinIn } from 'react-icons/fa';
import Swal from 'sweetalert2'

function LoginSignupPage() {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Data pass to api");
        if (data.status === "Already Registred") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Already Registered with this Email. Can not sign up again',
          });
        } else if (data.status === "ok") {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Successfully Registered. Check your email. Login credentials are there.',
          }).then(() => {
            window.location.reload();
          });
        }
        
      });
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(username, password);
    fetch("http://localhost:5000/api/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*"
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "Data pass to api");
        if (data.error === "Invalid Username") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Username.',
          });
        } else if (data.error === "Invalid Password") {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid Password.',
          });
        } else if (data.status === "ok") {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Login Successful.',
          });
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);          
        }
      });
  };
  

  return (
    <div className={`container ${isSignUpMode ? "sign-up-mode" : ""}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form" onSubmit={handleSignIn}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" value="Login" className="btn solid" />
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
          <form action="#" className="sign-up-form" onSubmit={ handleSignUp}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <input type="submit" className="btn" value="Sign up" />
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
              Sign up
            </button>
          </div>
          <img src={signup} className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
            Please sign in to access your account and 
            explore our exclusive collection of fabrics and accessories.
            </p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>
      </div>
    </div>
  );
}

export default LoginSignupPage;
