import React, { useState } from "react";
import axios from "axios";

const FresherVolunteerRegistration = () => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });
  const [successMessage, setSuccessMessage] = useState("");  // State for success message
  const [errorMessage, setErrorMessage] = useState("");  // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/freshersData", formData);
      console.log("Fresher Volunteer Registration Response:", response.data);
      
      // On successful registration, set success message
      setSuccessMessage("Registration Successful!");
      setErrorMessage("");  // Clear any previous error message
      setFormData({ name: "", phone: "", email: "" });  // Clear the form after submission
    } catch (error) {
      console.error("Error submitting Fresher Volunteer Registration:", error);
      
      // On error, set error message
      setErrorMessage("Registration failed. Please try again.");
      setSuccessMessage("");  // Clear any previous success message
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Roboto",
        backgroundColor: "#f0f0f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#00004d", textAlign: "center" }}>Fresher Volunteer Registration</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "400px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          style={{
            width: "100%",
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "5px",
          }}
        />
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
          Submit
        </button>
      </form>

      {/* Display Success or Error Message */}
      {successMessage && (
        <p style={{ color: "green", textAlign: "center", marginTop: "20px" }}>
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p style={{ color: "red", textAlign: "center", marginTop: "20px" }}>
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default FresherVolunteerRegistration;
