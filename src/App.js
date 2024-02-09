// App.js
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Register from "./components/Register";
import Main from "./main";
import Login from "./components/Login";
import Landingpage from "./components/LandingPage";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Use a function to initialize the state based on local storage
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    return storedAuth;
  });

  const handleLogin = (token) => {
    setIsAuthenticated(true);
    localStorage.setItem("isAuthenticated", "true");
    localStorage.setItem("token", token); // store the token
    // Additional logic to store other authentication details if required
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("token"); // clear the token
    setIsAuthenticated(false);
  };

  useEffect(() => {
    // This effect will run once on initial render to check if the user was authenticated
    const storedAuth = localStorage.getItem("isAuthenticated") === "true";
    if (storedAuth) {
      setIsAuthenticated(true);
    }
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route path="/register" component={Register} />
          <Route
            path="/login"
            render={(props) => (
              <Login
                {...props}
                handleLogin={handleLogin}
                isAuthenticated={isAuthenticated}
              />
            )}
          />
          <Route
            path="/vehicle/*"
            render={() => {
              return isAuthenticated ? (
                <Main handleLogout={handleLogout} />
              ) : (
                <Redirect to="/login" />
              );
            }}
          />
          <Route path="/" component={Landingpage} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
