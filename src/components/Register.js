import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";

export default function Register() {
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

    // if (!username) {
    //   setError("Username is required.");
    //   return;
    // }

    // if (!password) {
    //   setError("Password is required.");
    //   return;
    // }

    // if (username.length < 5) {
    //   setError("Username should be at least 5 characters long.");
    //   return;
    // }

    // // Password validation
    // const passwordRegex =
    //   /^(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
    // if (!passwordRegex.test(password)) {
    //   setError(
    //     "Password should be at least 8 and not greater than 30 characters having one uppercase letter and one special character."
    //   );
    //   return;
    // }

    const configuration = {
      method: "post",
      url: `${apiBaseUrl}/api/create-user`,
      data: {
        username,
        password,
      },
      headers: {
        Accept: "application/json",
        "ngrok-skip-browser-warning": "69420",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios(configuration)
      .then((result) => {
        history.push("/login");
      })
      .catch((error) => {
        setError("Registration failed. Please try again."); // Handle specific errors from the API if needed
      });
  };

  return (
    <div className="login-register-form">
      <div className="login-register-box card p-5 border-primary bg-body-secondary">
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>Register</h2>
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
              style={{ marginBottom: "8px" }}
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

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>

        <div style={{ marginTop: "10px", textAlign: "center" }}>
          Already have an account? <Link to="/login">Login now!</Link>
        </div>
      </div>
    </div>
  );
}
