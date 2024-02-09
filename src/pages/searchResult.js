import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import DataTable from "react-data-table-component";
import Loader from "../components/Loader";
import styles from "../components/Vehicle.module.css";
import ShowVehicleDeals from "../components/ShowVehicleDeals";

function SearchResult() {
  const { query } = useParams();
  const [searchResult, setSearchResult] = useState([]);
  const [getCarAndDealer, setGetCarAndDealer] = useState([]);
  const [priceResult, setPriceResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [minPrice, setMinPrice] = useState(null); 
  const [maxPrice, setMaxPrice] = useState(null); 
  const vehiclesPerPage = 8; // Define the number of vehicles per page

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setIsLoading(true);
        if (!query.trim()) {
          setIsLoading(false);
          return;
        }
        const url = `${apiBaseUrl}/api/search-sale-vin?query=${query}`;
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const { data } = response;

        if (data && data.length > 0) {
          setSearchResult(data);
        } else {
          setSearchResult([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [apiBaseUrl, query]);

  useEffect(() => {
    const fetchCarAndDealerSearchResult = async () => {
      try {
        setIsLoading(true);
        if (!query.trim()) {
          setIsLoading(false);
          return;
        }

        const url = `${apiBaseUrl}/api/search-vin?query=${query}`;

        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        const { data } = response;

        console.log(data);

        if (data && data.length > 0) {
          setGetCarAndDealer(data);
        } else {
          setGetCarAndDealer([]);
        }

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchCarAndDealerSearchResult();
  }, [apiBaseUrl, query]);

  //search the price set to max-min
  useEffect(() => {
    const fetchPriceResult = async () => {
      try {
        setIsLoading(true);

        if (!query.trim()) {
          setIsLoading(false);
          return;
        }

        const [min, max] = query.split(" to ").map(Number);
        const direction = min < max ? "min_to_max" : "max_to_min";

        const url = `${apiBaseUrl}/api/get-dealer-vehicle-by-price?min=${min}&max=${max}&page=${currentPage}&limit=${vehiclesPerPage}&search_direction=${direction}`;

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

        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchPriceResult();
  }, [apiBaseUrl, query, currentPage, vehiclesPerPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const vehicle = [
    {
      name: "Model",
      selector: "manufacturer_vehicle.car_model.modelName",
    },
    {
      name: "Brand",
      selector: "manufacturer_vehicle.car_model.brand.brandName",
    },
    {
      name: "Manufacturer",
      selector: "manufacturer_vehicle.manufacturer.manufacturerName",
    },
    {
      name: "VIN",
      selector: "manufacturer_vehicle.vin",
    },
    {
      name: "Price",
      selector: "price",
      cell: (row) => `$${row.price}`,
    },
  ];

  const customer = [
    // Define your table columns here
    // Example:
    {
      name: "Name",
      selector: "customer.customerName",
    },
    {
      name: "Address",
      selector: "customer.customerAddr",
    },
    {
      name: "Gender",
      selector: "customer.customerGender",
    },
    {
      name: "Phone",
      selector: "customer.customerPhone",
    },
    {
      name: "Annual Income",
      selector: "customer.customerAnnualIncome",
      cell: (row) => `$${row.customer.customerAnnualIncome}`,
    },
  ];

  const dealer = [
    // Define your table columns here
    // Example:
    {
      name: "Name",
      selector: "manufacturer_vehicle.dealer.dealerName",
    },
    {
      name: "Address",
      selector: "manufacturer_vehicle.dealer.dealerAddr",
    },
    {
      name: "Email",
      selector: "manufacturer_vehicle.dealer.dealerEmail",
    },
    {
      name: "Phone",
      selector: "manufacturer_vehicle.dealer.dealerPhone",
    },
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#060b26", // Background color for column headers
        color: "#fff", // Text color for column headers
        borderBottom: "2px solid #ddd", // Bottom border for column headers
      },
    },
    cells: {
      style: {
        backgroundColor: "#f7f7f7", // Background color for cells
        color: "#333", // Text color for cells
        border: "1px solid #ddd", // Bottom border for cells
      },
    },
  };

  return (
    <>
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
          {searchResult.length ||
          getCarAndDealer.length > priceResult.length ? (
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
                <div style={{ paddingBottom: "50px" }}>
                  <h1
                    style={{
                      textAlign: "center",
                      fontWeight: "900",
                      color: " #0e1e35",
                      margin: "50px 0",
                    }}
                  >
                    Search Results for vin "{query}"
                  </h1>

                  {/* vehicle */}
                  <div className="table-container">
                    <h2
                      style={{
                        textTransform: "upperCase",
                        fontWeight: "600",
                      }}
                    >
                      Vehicle
                    </h2>
                    {getCarAndDealer.length > 0 ? (
                      <DataTable
                        columns={vehicle}
                        data={getCarAndDealer}
                        customStyles={customStyles}
                      />
                    ) : (
                      <p>No results found</p>
                    )}
                  </div>

                  {/* dealer */}
                  <div className="table-container">
                    <h2
                      style={{
                        textTransform: "upperCase",
                        fontWeight: "600",
                      }}
                    >
                      Dealer
                    </h2>
                    {getCarAndDealer.length > 0 ? (
                      <DataTable
                        columns={dealer}
                        data={getCarAndDealer}
                        customStyles={customStyles}
                      />
                    ) : (
                      <p>No results found</p>
                    )}
                  </div>

                  {/* Customer */}
                  <div className="table-container">
                    <h2
                      style={{
                        textTransform: "upperCase",
                        fontWeight: "600",
                      }}
                    >
                      Customer
                    </h2>
                    {searchResult.length > 0 ? (
                      <DataTable
                        columns={customer}
                        data={searchResult}
                        customStyles={customStyles}
                      />
                    ) : (
                      <p>No results found</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div>
              {priceResult.length > 0 ? (
                <>
                  <h1
                    style={{
                      textAlign: "left",
                      fontWeight: "900",
                      color: "#0e1e35",
                      margin: "50px 0",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <i style={{ marginLeft: "55px" }}>
                      {minPrice && maxPrice
                        ? minPrice < maxPrice
                          ? `Vehicle Priced from $${minPrice} to $${maxPrice}`
                          : `Vehicle Priced from $${maxPrice} to $${minPrice}`
                        : "Vehicle Price Range not specified"}
                    </i>
                  </h1>

                  <div className={styles["vehicle-grid"]}>
                    {priceResult.map((vehicle, id) => (
                      <ShowVehicleDeals key={id} vehicle={vehicle} />
                    ))}
                  </div>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <span>Page: {currentPage}</span>
                    <div style={{ display: "flex", marginTop: "10px" }}>
                      <button onClick={prevPage} disabled={currentPage === 1}>
                        Prev Page
                      </button>
                      <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next Page
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div>
                  <h1
                    style={{
                      textAlign: "left",
                      fontWeight: "900",
                      color: "#0e1e35",
                      margin: "50px 0",
                      fontFamily: "Arial, sans-serif",
                    }}
                  >
                    <i style={{ marginLeft: "55px" }}>
                      {minPrice && maxPrice
                        ? minPrice < maxPrice
                          ? `Vehicle Priced from $${minPrice} to $${maxPrice}`
                          : `Vehicle Priced from $${maxPrice} to $${minPrice}`
                        : "Vehicle Price Range not specified"}
                    </i>
                  </h1>

                  <div className={styles["vehicle-grid"]}>
                    {/* You can display a message or anything else when there are no results */}
                    <p>No results found</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default SearchResult;
