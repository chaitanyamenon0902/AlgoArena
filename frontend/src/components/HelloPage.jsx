import React from "react";
import { useNavigate } from "react-router-dom";

const HelloPage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Welcome to Algo Arena</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={() => navigate("/login")}>
          Login
        </button>
        <button style={styles.button} onClick={() => navigate("/signup")}>
          Signup
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    textAlign: "center",
    backgroundColor: "#121212", // Dark background
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  heading: {
    fontSize: "3rem",
    margin: "0",
    fontWeight: "bold",
    letterSpacing: "2px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.7)", // Darker shadow for contrast
  },
  description: {
    margin: "20px 0",
    color: "#ccc", // Lighter gray for text
    fontSize: "1.2rem",
    lineHeight: "1.6",
    maxWidth: "600px",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
    marginTop: "20px",
  },
  button: {
    padding: "12px 30px",
    fontSize: "1rem",
    cursor: "pointer",
    border: "none",
    borderRadius: "30px",
    backgroundColor: "#333", // Dark button color
    color: "#fff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.6)", // Darker shadow for buttons
    transition: "all 0.3s ease-in-out",
  },
  buttonHover: {
    backgroundColor: "#444", // Slightly lighter on hover
    transform: "scale(1.05)",
  },
};

export default HelloPage;
