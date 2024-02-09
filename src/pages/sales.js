import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";

function SalesLastThreeYears() {
  const [allSales, setAllSales] = useState([]);
  const [salesLastThreeYears, setsalesLastThreeYears] = useState([]);
  const [topBrandsByDollar, setTopBrandsByDollar] = useState([]);
  const [topBrandsByUnitSales, setTopBrandsByUnitSale] = useState([]);
  const [selectedGender, setSelectedGender] = useState(""); // State to hold selected style filter
  const apiBaseUrl = process.env.REACT_APP_DEALERFLOW_BACKEND_API_BASEURL;

  useEffect(() => {
    const getAllSales = async () => {
      try {
        let url = `${apiBaseUrl}/api/get-sales`;
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setAllSales(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getAllSales();
  }, [apiBaseUrl]);

  //salepast3years
  useEffect(() => {
    const getSalesForThePastThreeYears = async () => {
      try {
        let url = `${apiBaseUrl}/api/get-sales-for-the-past-three-years`;
        if (selectedGender) {
          url += `?query=${selectedGender}`;
        }
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setsalesLastThreeYears(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getSalesForThePastThreeYears();
  }, [apiBaseUrl, selectedGender]);

  //top2brand
  useEffect(() => {
    const getTopBrandsByDollarAmount = async () => {
      try {
        let url = `${apiBaseUrl}/api/get-Top-Brands-By-Dollar-Amount`;
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setTopBrandsByDollar(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTopBrandsByDollarAmount();
  }, [apiBaseUrl]);

  //top2brandunitsale
  useEffect(() => {
    const getTopBrandsByUnitSale = async () => {
      try {
        let url = `${apiBaseUrl}/api/get-Top-Brands-By-Unit-Sales`;
        const response = await axios.get(url, {
          headers: {
            Accept: "application/json",
            "ngrok-skip-browser-warning": "69420",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        console.log(response.data);
        setTopBrandsByUnitSale(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTopBrandsByUnitSale();
  }, [apiBaseUrl]);

  const columns = [
    {
      name: "Customer",
      selector: "customer.customerName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Gender",
      selector: "customer.customerGender", // Replace with your data key
      sortable: true,
    },
    {
      name: "Annual Income",
      selector: "customer.customerAnnualIncome", // Replace with your data key
      sortable: true,
      cell: (row) => `$${row.customer.customerAnnualIncome}`,
    },
    {
      name: "Dealer",
      selector: "dealer_vehicle.manufacturer_vehicle.dealer.dealerName", // Replace with your data key
      sortable: true,
    },
    {
      name: "VIN",
      selector: "dealer_vehicle.manufacturer_vehicle.vin", // Replace with your data key
      sortable: true,
    },
    {
      name: "Brand",
      selector: "dealer_vehicle.manufacturer_vehicle.car_model.brand.brandName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Model",
      selector: "dealer_vehicle.manufacturer_vehicle.car_model.modelName", // Replace with your data key
      sortable: true,
    },
    {
      name: "Price",
      selector: "dealer_vehicle.price", // Replace with your data key
      sortable: true,
      cell: (row) => `$${row.dealer_vehicle.price}`,
    },
    {
      name: "Date Created",
      selector: "created_at", // Replace with your data key
      sortable: true,
    },
    // Add more columns as needed...
  ];

  //top2brandamount
  const brandsbydollar = [
    {
      name: "Brand Name",
      selector: "brandName",
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: "totalAmount",
      sortable: true,
      cell: (row) => `$${row.totalAmount}`, // Add this line to customize rendering
    },
    // Add more columns as needed...
  ];

  //top2brandbyunitsale
  const brandsbyunitsale = [
    {
      name: "Brand Name",
      selector: "brandName",
      sortable: true,
    },
    {
      name: "Total Unit Sales",
      selector: "totalUnitSales",
      sortable: true,
    },
    // Add more columns as needed...
  ];

  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "#060b26", // Adjust this color to your desired dark background
        color: "#fff", // Text color for column headers
      },
    },

    //border sale
    cells: {
      style: {
        backgroundColor: "#f7f7f7", // Background color for cells
        color: "#333", // Text color for cells
        border: "1px solid #ddd", // Bottom border for cells
      },
    },
  };

  const handleStyleChange = (e) => {
    setSelectedGender(e.target.value); // Update selected style when dropdown value changes
  };

  return (
    <div>
      <div
        className="table-container"
        style={{
          marginTop: "20px",
          paddingBottom: "50px",
          marginBottom: "50px",
        }}
      >
        <div>
          <h1>ALL SALES</h1>
          <DataTable
            columns={columns}
            data={allSales}
            pagination // Enable pagination if needed
            customStyles={customStyles} // Apply the custom styles to the table
            // Additional DataTable props can be added as needed
          />
        </div>

        <div>
          <h1>SALES FOR THE PAST THREE YEARS</h1>
          <div style={{ margin: "10px 2px" }}>
            <select
              style={{ padding: "5px", borderRadius: "5px", outline: "none" }}
              value={selectedGender}
              onChange={handleStyleChange}
            >
              <option value="">All</option>
              <option value="Male">MALE</option>
              <option value="Female">FEMALE</option>

              {/* Add other style options as needed */}
            </select>
          </div>
          <DataTable
            columns={columns}
            data={salesLastThreeYears}
            pagination // Enable pagination if needed
            customStyles={customStyles} // Apply the custom styles to the table
            // Additional DataTable props can be added as needed
          />
        </div>

        <div>
          <h1>TOP 2 BRANDS BY DOLLAR</h1>
          <DataTable
            columns={brandsbydollar}
            data={topBrandsByDollar}
            pagination // Enable pagination if needed
            customStyles={customStyles} // Apply the custom styles to the table
            // Additional DataTable props can be added as needed
          />
        </div>
        <div>
          <h1>TOP 2 BRANDS BY UNIT SALES</h1>
          <DataTable
            columns={brandsbyunitsale}
            data={topBrandsByUnitSales}
            pagination // Enable pagination if needed
            customStyles={customStyles} // Apply the custom styles to the table
            // Additional DataTable props can be added as needed
          />
        </div>
      </div>
    </div>
  );
}

export default SalesLastThreeYears;
