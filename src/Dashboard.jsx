import React from "react"; 
import { useLocation, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username || "Guest";

  const handleTFIRegistration = () => {
    navigate("/tfi-registration", { state: { username } });
  };

  const handleFresherVolunteerRegistration = () => {
    navigate("/fresher-registration", { state: { username } });
  };

  const handleBloodDonationRegistration = () => {
    navigate("/blood-donation-registration", { state: { username } });
  };

  const cards = [
    { title: "TFI Registration", buttonText: "Register", onClick: handleTFIRegistration },
    { title: "Fresher Volunteer Registrations", buttonText: "Register", onClick: handleFresherVolunteerRegistration },
    { title: "Blood Donation Volunteer", buttonText: "Register", onClick: handleBloodDonationRegistration },
  ];

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Roboto",
        textAlign: "center",
        backgroundColor: "#f0f0f5",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ color: "#00004d" }}>Hello, {username}!</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {cards.map((card, index) => (
          <div
            key={index}
            style={{
              width: "250px",
              padding: "20px",
              background: "#ffffff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              borderRadius: "10px",
              textAlign: "center",
            }}
          >
            <h3 style={{ color: "#00004d" }}>{card.title}</h3>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#00004d",
                color: "white",
                border: "none",
                borderRadius: "5px",
                marginTop: "10px",
              }}
              onClick={card.onClick}
            >
              {card.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
