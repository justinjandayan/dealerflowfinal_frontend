import React from "react";
import styles from "./Vehicle.module.css";
import { FaLongArrowAltRight } from "react-icons/fa";

function ShowDealerVehicle({ vehicle }) {
  const handleContactClick = () => {
    window.location.href = `mailto:${vehicle.manufacturer_vehicle.dealer.dealerEmail}`;
  };

  return (
    <>
      <div className={styles["card-container"]}>
        <img
          className={styles["card-image"]}
          src={vehicle.manufacturer_vehicle.car_model.image}
          alt={vehicle.manufacturer_vehicle.car_model.modelName}
        />

        <div className={styles["card-text-content"]}>
          <h2>
            {vehicle.manufacturer_vehicle.car_model.modelName}
            <FaLongArrowAltRight className={styles["arrow"]} />
            <span>
              {vehicle.manufacturer_vehicle.car_model.brand.brandName}
            </span>
          </h2>
          <div className={styles["vehicle-status-price"]}>
            <h4 className={styles["status"]}>{vehicle.status}</h4>
            <h4> $ {vehicle.price}</h4>
          </div>
          <div className={styles["dealer-info"]}>
            <h4>{vehicle.manufacturer_vehicle.dealer.dealerName}</h4>
            <h4>{vehicle.manufacturer_vehicle.dealer.dealerAddr}</h4>
            <h4>{vehicle.manufacturer_vehicle.dealer.dealerPhone}</h4>
          </div>

          <div className={styles["center-button"]}>
            <button
              className={styles["contact-me"]}
              onClick={handleContactClick}
            >
              Email Me
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ShowDealerVehicle;
