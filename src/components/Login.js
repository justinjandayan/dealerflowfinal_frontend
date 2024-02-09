import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Login({ handleLogin, isAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const history = useHistory();
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username && !password) {
      setError("Username and password are required.");
      return;
    }

    if (!username) {
      setError("Please enter your username");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    axios
      .post(`${apiBaseUrl}/api/login`, {
        username,
        password,
      })
      .then((result) => {
        sessionStorage.setItem("token", result.data.token);
        handleLogin(result.data.token);
        history.push("/vehicle/vehicle-list");
      })
      .catch((error) => {
        setError("Invalid username or password."); // Handle specific errors from the API if needed
      });
  };

  return (
    <div className="login-register-form">
      <div className="login-register-box card p-5 border-primary bg-body-secondary">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>LOGIN</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={(e) => handleSubmit(e)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter Username"
              style={{ marginBottom: "2px" }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              style={{ marginBottom: "8px" }}
            />
          </Form.Group>

          <Button className="w-100" variant="primary" type="submit">
            Login
          </Button>
        </Form>

        <div style={{ marginTop: "10px", textAlign: "center" }}>
          Don't have an account? <Link to="/register">Register now!</Link>
        </div>
      </div>
    </div>
  );
}
