import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import Dashboard from "./Dashboard";
import TFIRegistration from "./TFIRegistration";
import FresherVolunteerRegistration from "./FresherVolunteerRegistration";
import BloodDonationRegistration from "./BloodDonationRegistration";


const App = () => {
  return (
    <Router>
      <div>
        {/* Header Section */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 20px",
            backgroundColor: "#00004d",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            fontFamily: "Roboto",
            color: "white",
            fontWeight: "bold",
            height: "80px",
          }}
        >
          {/* Left - Logo */}
          <img
            src="/logonss.jpg"
            alt="Logo"
            style={{ height: "100px", width: "100px", cursor: "pointer" }}
          />

          {/* Center - Heading */}
          <h1 style={{ margin: 0, fontSize: "24px", textAlign: "center", flex: 1 }}>
            NSS Vasavi College of Engineering
          </h1>

          {/* Right - Login Button */}
          <LoginButton />
        </header>

        {/* Navigation Bar */}
        <nav
          style={{
            backgroundColor: "#8c8c8c",
            padding: "10px",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            fontFamily: "Roboto",
          }}
        >
          <ul
            style={{
              display: "flex",
              listStyleType: "none",
              margin: 0,
              padding: 0,
              justifyContent: "space-around",
            }}
          >
            <li>
              <Link to="/" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" style={{ color: "white", textDecoration: "none", fontSize: "18px" }}>
                About
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                style={{ color: "white", textDecoration: "none", fontSize: "18px" }}
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/tfi-registration" element={<TFIRegistration />} />
          <Route path="/fresher-registration" element={<FresherVolunteerRegistration />} />
          <Route path="/blood-donation-registration" element={<BloodDonationRegistration />} />


          

        </Routes>
      </div>
    </Router>
  );
};

const LoginButton = () => {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {/* NSS Member Login Button */}
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#ffffff",
          color: "#00004d",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
        onClick={() => navigate("/login")}
      >
        NSS Member Login
      </button>

    </div>
  );
};

export default App;  