import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TFIRegistration = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState("");
  const [participants, setParticipants] = useState(
    Array.from({ length: 4 }, () => ({ name: "", phone: "", email: "" }))
  );
  const [error, setError] = useState("");

  const handleInputChange = (index, field, value) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index][field] = value;
    setParticipants(updatedParticipants);
    setError(""); // Clear any previous error
  };

  // Ensure handleSubmit is async for the fetch call
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate unique participant names
    const names = participants.map((p) => p.name.trim());
    const uniqueNames = new Set(names);
    if (uniqueNames.size !== participants.length) {
      setError("Participant names must be unique.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ date, participants }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration successful!");
        navigate("/dashboard");
      } else {
        setError(data.message); // Show error message if date is already taken
      }
    } catch (err) {
      console.error("Error during registration:", err);
      setError("There was an issue with the registration.");
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
      <h1 style={{ color: "#00004d", textAlign: "center" }}>TFI Registration</h1>
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: "500px",
          margin: "0 auto",
          background: "#ffffff",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
        }}
      >
        <label style={{ display: "block", marginBottom: "10px" }}>
          Select Date:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
            }}
          />
        </label>

        {participants.map((participant, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <h4>Participant {index + 1}</h4>
            <input
              type="text"
              placeholder="Name"
              value={participant.name}
              onChange={(e) => handleInputChange(index, "name", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
            <input
              type="tel"
              placeholder="Phone"
              value={participant.phone}
              onChange={(e) => handleInputChange(index, "phone", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
            <input
              type="email"
              placeholder="Email"
              value={participant.email}
              onChange={(e) => handleInputChange(index, "email", e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                margin: "5px 0",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}
            />
          </div>
        ))}

        {error && (
          <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#00004d",
            color: "white",
            border: "none",
            borderRadius: "5px",
            marginTop: "20px",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TFIRegistration;
