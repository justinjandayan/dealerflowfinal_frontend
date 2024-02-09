import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import styles from "../components/Vehicle.module.css";
import Searchbar from "./searchbar";
import Loader from "./Loader";
import MinMax from "./MinMax";

function Brandlist() {
  const [brand, setBrand] = useState([]);
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;

  useEffect(() => {
    const getBrand = async () => {
      try {
        setIsLoading(true);
        let url = `${apiBaseUrl}/api/get-brands`;
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setBrand(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };
    getBrand();
  }, [apiBaseUrl]);

  const isActiveBrand = (brandId) => {
    const brandIdFromURL = location.pathname.match(
      /\/vehicle-By-Brand\/(\d+)/
    )?.[1];
    return brandId.toString() === brandIdFromURL;
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
          <Searchbar />
          <div className={styles["brand-list-container"]}>
            {brand.map((singleBrand) => (
              <Link
                to={`/vehicle/vehicle-By-Brand/${singleBrand.id}`}
                key={singleBrand.id}
                className={`${styles["brand-link"]} ${
                  isActiveBrand(singleBrand.id) ? styles["active-brand"] : ""
                }`}
              >
                <h2 className={styles["brand-list-text"]}>
                  {singleBrand.brandName}
                </h2>
              </Link>
            ))}
          </div>
          <MinMax />
        </div>
      )}
    </>
  );
}

export default Brandlist;
