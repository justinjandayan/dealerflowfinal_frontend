import React from "react";
import styles from "./Vehicle.module.css"; // Import the CSS module
import { Link } from "react-router-dom";

function Vehicle({ vehicle }) {
  const formattedModelName = vehicle.modelName.replace(/\s+/g, "-");
  return (
    <div className={styles["card-container"]}>
      <Link to={`/vehicle/${formattedModelName}-dealers/${vehicle.id}`}>
        <img
          className={styles["card-image"]}
          src={vehicle.image}
          alt={vehicle.modelName}
        />
      </Link>
      <div className={styles["card-text-content"]}>
        <Link to={`/vehicle/${formattedModelName}-dealers/${vehicle.id}`}>
          <h2>{vehicle.modelName}</h2>
        </Link>
        <div>
          <h4 className={styles["brand-name"]}>{vehicle.brand.brandName}</h4>
        </div>
      </div>
    </div>
  );
}

export default Vehicle;
