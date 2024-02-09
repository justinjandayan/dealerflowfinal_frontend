// main.js
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VehicleList from "./pages/VehicleList";
import ShowSpecificVehicle from "./pages/ShowSpecificVehicleDeals";
import CarModelByBrand from "./pages/CarModelByBrand";
import DealerProfile from "./pages/DealerProfiles";
import ShowDealerVehicle from "./components/ShowDealerVehicles";
import Manufacturer from "./pages/Manufacturer";
import Sales from "./pages/sales";
import SearchResult from "./pages/searchResult";
import SearchMinMax from "./pages/searchMinMaxresult";

function Main({ handleLogout }) {
  return (
    <>
      <Router>
        <Navbar handleLogout={handleLogout} />
        <Switch>
          <Route
            path="/vehicle/vehicle-By-Brand/:brandId"
            exact
            component={CarModelByBrand}
          />
          <Route path="/vehicle/vehicle-list" exact component={VehicleList} />
          <Route
            path="/vehicle/:dealerName-vehicle/:dealerId"
            exact
            component={ShowDealerVehicle}
          />
          <Route
            path="/vehicle/:modelName-dealers/:modelId"
            component={ShowSpecificVehicle}
          />
          <Route path="/vehicle/dealer-profile" component={DealerProfile} />
          <Route path="/vehicle/manufacturer" component={Manufacturer} />
          <Route path="/vehicle/sales" component={Sales} />
          <Route
            path="/vehicle/search-result/:query"
            component={SearchResult}
          />
          <Route path="/vehicle/search-min-max" component={SearchMinMax} />
        </Switch>
      </Router>
    </>
  );
}

export default Main;
