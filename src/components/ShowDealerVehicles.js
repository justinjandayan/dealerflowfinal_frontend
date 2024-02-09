import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import ShowVehicleDeals from "../components/ShowVehicleDeals";
import styles from "../components/Vehicle.module.css";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FaChevronLeft } from "react-icons/fa";
import DataTable from "react-data-table-component";
import Loader from "./Loader";

function ShowAllDealersVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [dealerInfo, setDealerInfo] = useState({}); // State for dealer information
  const vehiclesPerPage = 8; // Define the number of vehicles per page
  const [isLoading, setIsLoading] = useState(false);
  const [dealerVehicles, setdealerVehicles] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;

  const { dealerId } = useParams();

  const getVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      let url = `${apiBaseUrl}/api/dealer-vehicle-by-dealer/${dealerId}?page=${currentPage}&limit=${vehiclesPerPage}`;
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      const { models, currentPage: page, totalPages } = response.data;
      console.log(models);
      if (models.length === 0) {
        setVehicles([]);
        setCurrentPage(1);
        setTotalPages(0);
      } else {
        setVehicles(models);
        setCurrentPage(page);
        setTotalPages(totalPages);
        setDealerInfo(
          models.length > 0 ? models[0].manufacturer_vehicle.dealer : {}
        ); // Set dealer information
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }, [apiBaseUrl, dealerId, currentPage]);

  const getDealerVehicle = useCallback(async () => {
    try {
      let url = `${apiBaseUrl}/api/get-sales-by-dealer/${dealerId}`;
      const response = await axios.get(url, {
        headers: {
          Accept: "application/json",
          "ngrok-skip-browser-warning": "69420",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      console.log(response.data);
      setdealerVehicles(response.data); // Assuming setDealerVehicles is a state setter function
    } catch (error) {
      console.log(error);
    }
  }, [apiBaseUrl, dealerId]);

  const columns = [
    {
      name: "Customer",
      selector: "customer.customerName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Customer Address",
      selector: "customer.customerAddr", // Replace with your data key
      sortable: true,
    },
    {
      name: "Vehicle Model",
      selector: "dealer_vehicle.manufacturer_vehicle.car_model.modelName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Brand",
      selector: "dealer_vehicle.manufacturer_vehicle.car_model.brand.brandName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Price",
      selector: "dealer_vehicle.price", // Replace with your data key
      sortable: true,
    },
    {
      name: "Date",
      selector: "created_at", // Replace with your data key
      sortable: true,
    },
    // Add more columns as needed...
  ];

  useEffect(() => {
    getVehicles();
    getDealerVehicle();
  }, [getVehicles, getDealerVehicle]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#060b26", // Adjust this color to your desired dark background
        color: "#fff", // Text color for column headers
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <div className={styles["loading-styles"]}>
          <Loader />
        </div>
      ) : (
        <div className={styles["home-page"]}>
          <div className={styles["dealers-vehicle-profile"]}>
            <img src={dealerInfo.image} alt={dealerInfo.dealerName} />
          </div>
          <h1>{dealerInfo.dealerName}'s Vehicle</h1>
          {/* Consider rendering a specific vehicle's image */}
          {/* <img src={vehicles.modelName} alt={vehicles.modelName} /> */}
          <Link
            className={styles["dealer-deal"]}
            to={"/vehicle/dealer-profile"}
          >
            <span style={{ color: "black" }}>
              <FaChevronLeft className={styles["dealer-deal-arrow"]} />
              back
            </span>
          </Link>
          <div className={styles["vehicle-grid"]}>
            {vehicles.map((vehicle) => (
              <ShowVehicleDeals key={vehicle._id} vehicle={vehicle} />
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

          <div className="table-container">
            <h2>{dealerInfo.dealerName}'s Customer Deals</h2>
            <DataTable
              columns={columns}
              data={dealerVehicles}
              pagination // Enable pagination if needed
              customStyles={customStyles} // Apply the custom styles to the table
              // Additional DataTable props can be added as needed
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ShowAllDealersVehicles;
