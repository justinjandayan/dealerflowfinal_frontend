import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowDealerProfile from "../components/ShowDealerProfile";

function DealerProfile() {
  const [dealerProfiles, setDealerProfiles] = useState([]);
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;

  useEffect(() => {
    const getDealerProfiles = async () => {
      try {
        let url = `${apiBaseUrl}/api/get-dealers`;
        // console.log(response.data); // Check to ensure you're receiving data
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setDealerProfiles(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDealerProfiles();
  }, [apiBaseUrl]);

  return (
    <div className="specific-dealer-container">
      <h1>Dealer Profile</h1>
      {dealerProfiles.map((vehicle) => (
        <ShowDealerProfile key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}

export default DealerProfile;
