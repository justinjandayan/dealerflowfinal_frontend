import React from "react";

function Footer() {
  return (
    <footer
      className="footer"
      style={{
        backgroundColor: "#2169ba",
        color: "#fff",
        padding: "20px 0",
        textAlign: "center",
        marginTop: "25px",
      }}
    >
      <div className="container">
        <p>
          &copy; {new Date().getFullYear()} DealerFlow. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
