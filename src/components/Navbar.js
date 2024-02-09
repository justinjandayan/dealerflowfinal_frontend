// Navbar.js
import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, useHistory } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import "./Navbar.css";
import { IconContext } from "react-icons";

function Navbar({ handleLogout }) {
  const [sidebar, setSidebar] = useState(false);
  const history = useHistory();

  const showSidebar = () => setSidebar(!sidebar);

  const handleLogoutClick = () => {
    // Perform actions to clear authorization
    handleLogout(); // Update authentication status to false
    history.push("/login"); // Redirect to login page
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar px-3">
          <Link
            to="/vehicle/vehicle-list"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              className="image-black"
              src={process.env.PUBLIC_URL + "/images/image7.png"}
              alt="logo"
            />
          </Link>

          <span className="logo-text">
            <h1 style={{ margin: 0 }}>DEALER FLOW</h1>
          </span>

          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            <li className="nav-text logout">
              <Link to="#" onClick={handleLogoutClick}>
                <FaIcons.FaSignOutAlt />
                <span>Sign Out</span>
              </Link>
            </li>
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;
