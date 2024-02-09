import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Vehicle from "../components/Vehicle";
import styles from "../components/Vehicle.module.css";
import Brandlist from "../components/Brandlist";
import { useParams } from "react-router-dom";

function CarModelByBrand() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const vehiclesPerPage = 8; // Define the number of vehicles per page
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;

  const { brandId } = useParams();

  const getVehicles = useCallback(async () => {
    try {
      let url = `${apiBaseUrl}/api/specific-model-brand/${brandId}?page=${currentPage}&limit=${vehiclesPerPage}`;
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

      if (models.length === 0) {
        setVehicles([]);
        setCurrentPage(1);
        setTotalPages(0);
      } else {
        setVehicles(models);
        setCurrentPage(page);
        setTotalPages(totalPagesFromBackend);
      }
    } catch (error) {
      console.log(error);
    }
  }, [apiBaseUrl, brandId, currentPage]);

  useEffect(() => {
    getVehicles();
  }, [getVehicles]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div className={styles["home-page"]}>
      <h1>CAR LIST</h1>
      <Brandlist />
      <div className={styles["vehicle-grid"]}>
        {vehicles.map((vehicle) => (
          <Vehicle key={vehicle._id} vehicle={vehicle} />
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
  );
}

export default CarModelByBrand;
