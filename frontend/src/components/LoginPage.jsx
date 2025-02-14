import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/auth/signin", { email, password });
      localStorage.setItem("token",response.data.token)
      if (response.data.username) {
        localStorage.setItem("username", response.data.username); // Store username

        console.log(response.data.token)
        navigate("/create-join"); // Navigate to create-join page
      } else {
        console.warn("Username not found in API response");
        alert("Login successful, but username is missing.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h1 style={styles.heading}>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
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
    backgroundColor: "#121212", // Dark background
    color: "#fff",
    fontFamily: "Arial, sans-serif",
    padding: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1e1e1e", // Darker container for form
    padding: "30px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.7)",
    width: "100%",
    maxWidth: "400px",
  },
  heading: {
    fontSize: "2rem",
    marginBottom: "20px",
    fontWeight: "bold",
    letterSpacing: "1px",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    marginBottom: "15px",
    fontSize: "1rem",
    backgroundColor: "#333",
    color: "#fff",
    border: "1px solid #444",
    borderRadius: "5px",
    outline: "none",
  },
  button: {
    padding: "14px 0",
    fontSize: "1.1rem",
    cursor: "pointer",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "#ff5722",
    color: "#fff",
    width: "100%",
    transition: "all 0.3s ease-in-out",
  },
};

export default LoginPage;
