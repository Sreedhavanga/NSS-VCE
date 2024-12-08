import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // API call to authenticate user
    const response = await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Store token in localStorage
      localStorage.setItem("token", data.token);
      navigate("/dashboard", { state: { username } });
    } else {
      alert(data.message); // Show error message
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f0f0f5",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          background: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          borderRadius: "10px",
          padding: "20px",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontFamily: "Roboto", color: "#00004d", marginBottom: "20px" }}>
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Username Field */}
          <label style={{ fontSize: "1rem", marginBottom: "5px", display: "block" }}>
            Username:
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />

          {/* Password Field */}
          <label style={{ fontSize: "1rem", marginBottom: "5px", display: "block" }}>
            Password:
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              margin: "10px 0",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />

          {/* Submit Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              backgroundColor: "#00004d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              marginTop: "10px",
            }}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
