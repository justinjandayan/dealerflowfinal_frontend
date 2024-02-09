import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Searchbar() {
  const history = useHistory();
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSearch = async () => {
    // Conditionally include non-empty parameters in the URL
    const searchParams = {};

    if (minPrice !== "") {
      searchParams.minPrice = minPrice;
    }

    if (maxPrice !== "") {
      searchParams.maxPrice = maxPrice;
    }

    // Create the search string
    const searchString = new URLSearchParams(searchParams).toString();

    // Push the search string to the history
    history.push(`/vehicle/search-min-max?${searchString}`);
  };

  return (
    <div>
      <div
        style={{
          width: "20%",
          minWidth: "250px", // Set minimum width to 250px
          display: "flex",
          alignItems: "center",
          marginLeft: "38px",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <input
          type="text"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          placeholder="Min Price"
          style={{
            width: "40%",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            marginRight: "8px",
          }}
        />
        <input
          type="text"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          placeholder="Max Price"
          style={{
            width: "40%",
            padding: "8px",
            borderRadius: "4px",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
            marginRight: "8px",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "4px 5px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#6400ff",
            color: "#fff",
            cursor: "pointer",
            boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Searchbar;
