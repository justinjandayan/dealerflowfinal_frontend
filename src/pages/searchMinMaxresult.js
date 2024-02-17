import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import styles from "../components/Vehicle.module.css";
import ShowVehicleDeals from "../components/ShowVehicleDeals";

function SearchResult() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const minPrice = queryParams.get("minPrice");
  const maxPrice = queryParams.get("maxPrice");
  const [priceResult, setPriceResult] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const vehiclesPerPage = 8;
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;

  console.log(minPrice, maxPrice);
  useEffect(() => {
    const fetchPriceResult = async () => {
      try {
        setIsLoading(true);
        let url = `${apiBaseUrl}/api/get-dealer-vehicle-by-price?page=${currentPage}&limit=${vehiclesPerPage}`;

        if (minPrice) {
          url += `&minPrice=${minPrice}`;
        }

        if (maxPrice) {
          url += `&maxPrice=${maxPrice}`;
        }

        console.log(url);
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const { data } = response;

        if (!data.dealerVehicles || data.dealerVehicles.length === 0) {
          setPriceResult([]);
          setCurrentPage(1);
          setTotalPages(0);
        } else {
          const { dealerVehicles, currentPage, totalPages } = data;

          setPriceResult(dealerVehicles);
          setCurrentPage(currentPage);
          setTotalPages(totalPages);
        }
      } catch (error) {
        console.error("Error fetching dealer vehicles:", error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPriceResult();
  }, [apiBaseUrl, minPrice, maxPrice, currentPage, vehiclesPerPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  console.log(priceResult);

  const max = Math.max(...priceResult.map((vehicle) => vehicle.price));
  const min = Math.min(...priceResult.map((vehicle) => vehicle.price));
  return (
    <>
      <div>
        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Loader />
          </div>
        ) : (
          <div>
            <h1
              style={{
                textAlign: "left",
                fontWeight: "900",
                color: "#0e1e35",
                margin: "50px 0 50px 50px", // Adjust the left margin here
                fontFamily: "Arial, sans-serif",
              }}
            >
              Minimum Price&nbsp;
              <span
                style={{ textDecoration: "underline", fontStyle: "italic" }}
              >
                {min || 0}
              </span>
              &nbsp;To Maximum Price&nbsp;
              <span
                style={{ textDecoration: "underline", fontStyle: "italic" }}
              >
                {max || Infinity}
              </span>
            </h1>

            <div className={styles["vehicle-grid"]}>
              {priceResult.map((priceResult, index) => (
                <ShowVehicleDeals
                  key={index}
                  vehicle={priceResult}
                  isMaxPrice={priceResult.price === max}
                  isMinPrice={priceResult.price === min}
                />
              ))}
            </div>
            <div className={styles["pagination-container"]}>
              <span>Page: {currentPage}</span>
              <div className={styles["pagination-buttons"]}>
                <button
                  className="btn btn-primary"
                  onClick={prevPage}
                  disabled={currentPage === 1}
                >
                  Prev Page
                </button>
                <button
                  className="btn btn-primary"
                  onClick={nextPage}
                  disabled={currentPage === totalPages}
                >
                  Next Page
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default SearchResult;
