import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Vehicle from "../components/Vehicle";
import styles from "../components/Vehicle.module.css";
import Brandlist from "../components/Brandlist";

function Home() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [vehiclesPerPage] = useState(8);
  const [totalPages, setTotalPages] = useState(0);
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;

  const getVehicles = useCallback(async () => {
    try {
      let url = `${apiBaseUrl}/api/get-car-model?page=${currentPage}&limit=${vehiclesPerPage}`;
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const {
        models,
        currentPage: page,
        totalPages: totalPagesFromBackend,
      } = response.data;
      console.log(models);
      setVehicles(models);
      setCurrentPage(page);
      setTotalPages(totalPagesFromBackend);
    } catch (error) {
      console.log(error);
    }
  }, [apiBaseUrl, currentPage, vehiclesPerPage]);

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="vehiclelist-background">
      <div className={styles["home-page"]}>
        <h1>CAR LIST</h1>
        <Brandlist />

        <div className={styles["vehicle-grid"]}>
          {vehicles.map((vehicle, index) => (
            <Vehicle key={index} vehicle={vehicle} />
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
    </div>
  );
}

export default Home;
