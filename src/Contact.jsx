import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  });

  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:5000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Feedback submitted successfully!");
        setFormData({ name: "", email: "", feedback: "" });
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || "Failed to submit feedback. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Roboto", backgroundColor: "#f7f7f7" }}>
      {/* Location Section */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#00004d",
          color: "white",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ margin: "0" }}>Our Location</h2>
        <p style={{ margin: "10px 0 20px 0" }}>
          Vasavi College of Engineering, Hyderabad, India
        </p>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.9564395344927!2d78.38678437425167!3d17.39463858806164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcba3d8741dcd1f%3A0x74cf344c30d14567!2sVasavi%20College%20of%20Engineering!5e0!3m2!1sen!2sin!4v1699483265432!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen=""
          loading="lazy"
          title="Vasavi College of Engineering Location"
        ></iframe>
      </div>

      {/* Feedback Form Section */}
      <div
        style={{
          padding: "20px",
          backgroundColor: "#ffffff",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ marginBottom: "20px", color: "#00004d" }}>Feedback Form</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="name" style={{ fontSize: "16px", fontWeight: "bold" }}>
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label htmlFor="email" style={{ fontSize: "16px", fontWeight: "bold" }}>
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label htmlFor="feedback" style={{ fontSize: "16px", fontWeight: "bold" }}>
              Feedback:
            </label>
            <textarea
              id="feedback"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                marginTop: "5px",
                height: "100px",
              }}
            ></textarea>
          </div>

          <button
            type="submit"
            style={{
              padding: "10px 20px",
              backgroundColor: "#00004d",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>

        {message && (
          <p style={{ marginTop: "20px", color: message.includes("success") ? "green" : "red" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Contact;
