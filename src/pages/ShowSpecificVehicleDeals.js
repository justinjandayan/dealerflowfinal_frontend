import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ShowVehicleDeals from "../components/ShowVehicleDeals";
import styles from "../components/Vehicle.module.css";
import Brandlist from "../components/Brandlist";
import { useParams } from "react-router-dom";

function ShowSpecificVehicleDeals() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [modelInfo, setModelInfo] = useState({}); // State for dealer information
  const vehiclesPerPage = 8; // Define the number of vehicles per page
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedPrice, setSelectedPrice] = useState(""); // State to hold selected style filter
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;

  const { modelId } = useParams();

  const getVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      let url = `${apiBaseUrl}/api/dealer-vehicle-by-car-model/${modelId}?page=${currentPage}&limit=${vehiclesPerPage}`;
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const { models, currentPage: page, totalPages } = response.data;

      if (models.length === 0) {
        setVehicles([]);
        setCurrentPage(1);
        setTotalPages(0);
      } else {
        setVehicles(models);
        setCurrentPage(page);
        setTotalPages(totalPages);
        setModelInfo(
          models.length > 0 ? models[0].manufacturer_vehicle.car_model : {}
        ); // Set dealer information
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [apiBaseUrl, modelId, currentPage]);

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
    <>
      {isLoading ? (
        <div className={styles["loading-styles"]}>
          <p>Loading..</p>
        </div>
      ) : (
        <div className={styles["home-page"]}>
          <h1>{modelInfo.modelName}'s Dealers </h1>
          {/* Consider rendering a specific vehicle's image */}
          {/* <img src={vehicles.modelName} alt={vehicles.modelName} /> */}

          <Brandlist />
          <div className={styles["vehicle-grid"]}>
            {vehicles.map((vehicle) => (
              <ShowVehicleDeals key={vehicle.id} vehicle={vehicle} />
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
    </>
  );
}

export default ShowSpecificVehicleDeals;
