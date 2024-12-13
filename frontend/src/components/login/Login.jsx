// src/components/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // For navigation
import axiosInstance from '../../utils/axiosinstance'; // Replace with your actual axios instance
import './Login.css'; // You can define your styles here
import ErrorModal from '../errormodal/ErrorModal'; // Import the modal component

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous error messages

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    // Login API Call
    try {
      const response = await axiosInstance.post("/login", {
        email: email,
        password: password,
      });

      // Handle successful login response
      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
        navigate("/home");
      }
    } catch (err) {
      // Handle login error
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  // Email validation function
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div className="container">
      <h2>Login</h2>

      {/* ErrorModal displays error messages */}
      {error && <ErrorModal message={error} onClose={() => setError(null)} />}

      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email" className="bold-label">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="bold-label">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit">Login</button>
      </form>

      <p>
        Don't have an account?{" "}
        <span
          onClick={() => navigate("/")}
          className="login-link"
        >
          Create New Account
        </span>
      </p>
    </div>
  );
};

export default Login;
