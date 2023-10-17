import React, { useEffect, useState } from "react";
import InvoiceSummary from "./MonthlyReportTabs/InvoiceSummary";
import TaxSummary from "./MonthlyReportTabs/TaxSummary";
import ClearanceSummary from "./MonthlyReportTabs/ClearanceSummary";
import CollectionSummary from "./MonthlyReportTabs/CollectionSummary";
import CustomerValueAddition from "./MonthlyReportTabs/CustomerValueAddition";
import SalesOutstandingBills from "./MonthlyReportTabs/SalesOutstandingBills";
import AllOutstandingBills from "./MonthlyReportTabs/AllOutstandingBills";
import MachineUtilisation from "./MonthlyReportTabs/MachineUtilisation";
import MaterialSalesSummary from "./MonthlyReportTabs/MaterialSalesSummary";
import { Tab, Tabs } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Typeahead } from "react-bootstrap-typeahead";

export default function MonthlyReport() {
  const navigate = useNavigate();

  const [getName, setGetName] = useState("");
  const [month, setMonth] = useState("");
  const [wordMonth, setWordMonth] = useState("");
  const [year, setYear] = useState("");
  const [getInvoiceValues, setGetIvoiceValues] = useState([]);
  const [getClearanceValues, setGetClearanceValues] = useState([]);
  const [getTaxValues, setGetTaxValues] = useState([]);
  const [getCollectionValues, setGetCollectionValues] = useState([]);
  const [getAdditionValues, setGetAdditionValues] = useState([]);
  const [getAllOutStandingValues, setGetAllOutStandingValues] = useState([]);
  const [getSalesOutStandingValues, setGetSalesOutStandingValues] = useState(
    []
  );
  const [getCustNames, setGetCustNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  // const [selectedMonth, setSelectedMonth] = useState(1);
  // const monthOptions = Array.from({ length: 12 }, (_, i) => i + 1);

  // const handleMonthChange = (event) => {
  //   setSelectedMonth(parseInt(event.target.value));
  // };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const convertToMonthName = (month) => {
    if (month >= 1 && month <= 12) {
      setWordMonth(monthNames[month - 1]); // Set the "month" state directly
    }
  };

  const handleNames = (selected) => {
    const selectedCustomer = selected[0];
    setSelectedOption(selected); // Update selected option state
    setGetName(selectedCustomer ? selectedCustomer.UnitName : ""); // Update selected name
  };

  const handleMonth = (e) => {
    setMonth(e.target.value);
    convertToMonthName(e.target.value);
  };

  const handleYear = (e) => {
    setYear(e.target.value);
  };

  useEffect(() => {
    axios
      .post(`http://localhost:3001/monthlyReportData/custNames`)
      .then((res) => {
        setGetCustNames(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  }, []);

  const handleGetData = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/monthlyReportData/monthlyInvoiceSummary`,
        {
          getName: getName,
          month: month,
          year: year,
        }
      );
      // console.log("firstTable", response.data)
      setGetIvoiceValues(response.data);
    } catch (error) {
      console.error("Error in table", error);
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/monthlyReportData/monthlyClearanceSummary`,
        {
          getName: getName,
          month: month,
          year: year,
        }
      );
      // console.log("firstTable", response.data)
      setGetClearanceValues(response.data);
    } catch (error) {
      console.error("Error in table", error);
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/monthlyReportData/monthlyTaxSummary`,
        {
          getName: getName,
          month: month,
          year: year,
        }
      );
      // console.log("firstTable", response.data)
      setGetTaxValues(response.data);
    } catch (error) {
      console.error("Error in table", error);
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/monthlyReportData/monthlyCollectionSummary`,
        {
          getName: getName,
          month: month,
          year: year,
        }
      );
      // console.log("firstTable", response.data)
      setGetCollectionValues(response.data);
    } catch (error) {
      console.error("Error in table", error);
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/monthlyReportData/monthlyCutomerAddition`,
        {
          getName: getName,
          month: month,
          year: year,
        }
      );
      // console.log("firstTable", response.data)
      setGetAdditionValues(response.data);
    } catch (error) {
      console.error("Error in table", error);
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/monthlyReportData/allOutStandingBills`,
        {
          //getName: getName,
          month: month,
          year: year,
        }
      );
      // console.log("firstTable", response.data)
      setGetAllOutStandingValues(response.data);
    } catch (error) {
      console.error("Error in table", error);
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/monthlyReportData/salesOutStandingBills`,
        {
          //getName: getName,
          month: month,
          year: year,
        }
      );
      // console.log("firstTable", response.data)
      setGetSalesOutStandingValues(response.data);
    } catch (error) {
      console.error("Error in table", error);
    }
  };

  // console.log("Addition", getAdditionValues);
  

  return (
    <div>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">HO Accounts Monthly Report</h4>
        </div>
      </div>
      {/* <div className=" row col-md-12">
        <div className=" row col-md-12"> 
          <label
            className="form-label mt-2 col-md-4"
            style={{ whiteSpace: "nowrap" }}
          >
            Unit Monthly Report {getName} for {wordMonth} {year}
          </label>
          <div className="col-md-2">
            <label className="form-label">Select List</label>
            <Typeahead
              id="basic-example"
              labelKey={(option) => (option && option.UnitName ? option.UnitName.toString() : '')}
              options={getCustNames}
              placeholder="Select Customer"
              onChange={handleNames}
              selected={selectedOption} 
            />
          </div>
          <div className="col-md-1">
            <label className="form-label">Month</label>
            <input
              onChange={(e) => handleMonth(e)}
              className="col-md-8"
              type="number"
              id="quantity"
              name="quantity"
              min="1"
              max="12"
            />
          </div>

          <div className="col-md-1 ">
            <label className="form-label">Year</label>
            <input
              className="col-md-9"
              onChange={(e) => handleYear(e)}
              type="number"
              id="quantity"
              name="quantity"
              min="2000"
              max="9999"
            />
          </div>

          <div className="col-md-2 ">
            <button 
            className="button-style  group-button"
            onClick={handleGetData}
            >Load Data</button>
          </div>
          <div className="col-md-2">
            <button
              className="button-style mt-2 group-button"
              type="button"
              onClick={(e) => navigate("/home")}
            >
              Close
            </button>
          </div>
        </div>
      </div> */}

      <div className=" row col-md-12">
        <div className=" row col-md-12">
          <div className="col-md-4">
            <label
              className="form-label mt-2 col-md-4"
              style={{ whiteSpace: "nowrap", marginLeft: "-20px" }}
            >
              Unit Monthly Report {getName} for {wordMonth} {year}
            </label>
          </div>

          <div className="row col-md-6">
            <div className="col-md-6" style={{ marginLeft: "60px" }}>
              <label
                className="form-label"
                style={{ whiteSpace: "nowrap", zIndex: "2" }}
              >
                Select List
              </label>

              <Typeahead
                id="basic-example"
                labelKey={(option) =>
                  option && option.UnitName ? option.UnitName.toString() : ""
                }
                options={getCustNames}
                placeholder="Select Customer"
                onChange={handleNames}
                selected={selectedOption}
              />
            </div>

            <div className="d-flex col-md-4" style={{ gap: "30px" }}>
              <div className="col-md-6">
                <label className="form-label">Month</label>
                <input
                  className="no-spinner"
                  onChange={(e) => handleMonth(e)}
                  type="text"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="12"
                />

                {/* <select value={selectedMonth} onChange={handleMonthChange}>
                  {monthOptions.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select> */}
              </div>

              <div className="col-md-7">
                <label className="form-label">Year</label>
                <input
                  onChange={(e) => handleYear(e)}
                  className=""
                  id="quantity"
                  name="quantity"
                />
              </div>
            </div>
          </div>

          <div className="col-md-2">
            <div className="">
              <button
                className="button-style  group-button"
                onClick={handleGetData}
              >
                Load Data
              </button>
            </div>
            <div className="">
              <button
                className="button-style mt-2 group-button"
                type="button"
                onClick={(e) => navigate("/home")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      <hr
        style={{
          backgroundColor: "black",
          height: "3px",
        }}
      />
      <div>
        <Tabs style={{ display: "flex", fontSize: "10.7px" }}>
          <Tab eventKey="invoiceSummary" title="Invoice Summary">
            <InvoiceSummary getInvoiceValues={getInvoiceValues} />
          </Tab>
          <Tab eventKey="taxSummary" title="Tax Summary">
            <TaxSummary getTaxValues={getTaxValues} />
          </Tab>
          <Tab eventKey="clearanceSummary" title="Clearance Summary">
            <ClearanceSummary getClearanceValues={getClearanceValues} />
          </Tab>
          <Tab eventKey="collectionSummary" title="Collection Summary">
            <CollectionSummary getCollectionValues={getCollectionValues} />
          </Tab>
          <Tab eventKey="customerValueAddition" title="Customer Value Addition">
            <CustomerValueAddition getAdditionValues={getAdditionValues} />
          </Tab>
          <Tab eventKey="salesOutstandingBills" title="Sales Outstanding Bills">
            <SalesOutstandingBills
              getSalesOutStandingValues={getSalesOutStandingValues}
            />
          </Tab>
          <Tab eventKey="allOutstandingBills" title="All Outstanding Bills">
            <AllOutstandingBills
              getAllOutStandingValues={getAllOutStandingValues}
            />
          </Tab>
          <Tab eventKey="machineUtilisation" title="Machine Utilisation">
            <MachineUtilisation />
          </Tab>
          <Tab eventKey="MaterialSalesSummary" title="Material Sales Summary">
            <MaterialSalesSummary />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
