import React, { useState } from "react";
import styles from "../components/Vehicle.module.css";
import { useHistory } from "react-router-dom";

function Searchbar() {
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = async () => {
    history.push(`/vehicle/search-result/${searchQuery}`);
  };

  return (
    <div className={styles["search-container"]}>
      <div
        style={{
          width: "50%",
          minWidth: "250px", // Set minimum width to 250px
          display: "flex",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            marginRight: "8px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 12px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#4f92ffd8",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
