import axios from "axios";
import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useNavigate } from "react-router-dom";
import { baseURL } from "../../../../../api/baseUrl";

export default function CreateNewForm() {
  const navigate = useNavigate();
  const [getUnit, setGetUnit] = useState("");
  const [getCustomer, setGetCustomer] = useState("");
  const [getCustCode, setGetCustCode] = useState("");
  // const [getInputCustName, setGetInputCustName] = useState("");
  const [selectedTxntType, setSelectedTxntType] = useState("");
  const [getUnitNames, setGetUnitNames] = useState([]);
  const [getCustNames, setGetCustNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedCustOption, setSelectedCustOption] = useState([]);

  const initial = {
    RecdPVID: "",
    Recd_PVNo: 'Draft',
    // Recd_PV_Date: formatDate(date),
    ReceiptStatus: 'Draft',
    CustName: '',
    Cust_code: '',
    TxnType: '',
    Amount: '',
    On_account: '',
    Description: '',
    selectedCustomer: ''
  };

  const [postData, setPostData] = useState(initial);


  const options = [
    { value: "option 1", label: "Bank" },
    { value: "option 2", label: "Cash" },
    { value: "option 3", label: "Adjustment" },
    { value: "option 4", label: "Rejection" },
    { value: "option 5", label: "TDS Receivable" },
    { value: "option 6", label: "Rate Difference" },
    { value: "option 7", label: "Short Supply" },
    { value: "option 8", label: "Balance Recoverable" },
    { value: "option 9", label: "Other Income" },
    { value: "option 10", label: "Balance Not Recoverable" },
    { value: "option 11", label: "QR Code And RTGS" },
  ];

  // Create a new Date object
  const currentDate = new Date();

  // Get the various components of the date (day, month, year)
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1; // Months are zero-based (0 = January)
  const year = currentDate.getFullYear();

  // Format day, month, and year as two-digit strings
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Create the formatted date string
  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  // Initialize a state variable to hold the input value
  const [inputValue, setInputValue] = useState(formattedDate);

  const handleUnitNames = () => {
    axios
      .post(baseURL + "/hoCreateNew/unitNames")
      .then((res) => {
        setGetUnitNames(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  };

  const handleCustomerNames = () => {
    axios
      .post(baseURL + "/hoCreateNew/customerNames")
      .then((res) => {
        setGetCustNames(res.data);
      })
      .catch((err) => {
        console.log("err in table", err);
      });
  };

  const handleSelectUnit = (selected) => {
    const selectedCustomer = selected[0];
    setSelectedOption(selected); // Update selected option state
    setGetUnit(selectedCustomer ? selectedCustomer.UnitName : ""); // Update selected name
  };

  const handleSelectCustomer = (selected) => {
    const selectedCustomer = selected[0];
    setSelectedCustOption(selected); // Update selected option state
    setGetCustomer(selectedCustomer ? selectedCustomer.Cust_Name : ""); // Update selected Name
    setGetCustCode(selectedCustomer ? selectedCustomer.Cust_Code : ""); // Update selected Code
  };

  useEffect(() => {
    handleUnitNames();
    handleCustomerNames();
  }, []);

  // Event handler to update the input value
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleTxnTYpeChange = (event) => {
    setSelectedTxntType(event.target.value);
  };

  // const handleCustomerInput = (event)=>{
  //   setGetInputCustName(event.target.value);
  // }

  // console.log("Name and code", getCustomer, getCustCode);
  // console.log("unit name", getUnit);
  // console.log(formattedDate);
  console.log(selectedTxntType);
  return (
    <>
      <div className="col-md-12">
        <div className="row">
          <h4 className="title">Head Office Payment Receipt Register </h4>
        </div>
      </div>

      <div className="row col-md-12">
        <div className="col-md-10">
          <label className="form-label ">Create New Payment Receipt</label>
        </div>
        <div className="col-md-2">
          <button style={{width:'90px'}}
            className="button-style group-button "
            onClick={() => navigate("/HOAccounts")}
          >
            Close
          </button>
        </div>
      </div>




      <div className="row col-md-12 " >
        <div className="col-md-2">
          <label className="form-label ">Href No</label>
          <input class="" type="text" placeholder="" value="Draft" />
        </div>

        <div className="col-md-3">
          <label className="form-label">Date</label>
          <input
            className=""
            value={inputValue}
          // onChange={handleInputChange}
          />
        </div>

        <div className="col-md-3">
          <label className="form-label">Select Unit </label>
          <Typeahead
            id="basic-example"
            labelKey={(option) =>
              option && option.UnitName
                ? option.UnitName.toString()
                : ""
            }
            options={getUnitNames}
            placeholder="Select Unit"
            onChange={handleSelectUnit}
            selected={selectedOption}
          />
        </div>

        <div className=" col-md-4  ">
          <label className="form-label">Customer</label>
          <Typeahead
            id="basic-example"
            labelKey={(option) =>
              option && option.Cust_Name
                ? option.Cust_Name.toString()
                : ""
            }
            options={getCustNames}
            placeholder="Select Customer"
            onChange={handleSelectCustomer}
            selected={selectedCustOption}
          />
        </div>
      </div>







      <div className="row col-md-12 " style={{}}>

        <div className="col-md-2">
          <label className="form-label">Transaction Type</label>
          <select
            className="ip-select"
            onChange={handleTxnTYpeChange}
            value={selectedTxntType}
          >
            {options.map((option) => (
              <option key={option.label} value={option.label}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 ">
          <label className="form-label">Receive Form</label>
          <input className="" value={getCustomer} type="text" />
        </div>

        <div className="col-md-3">
          <label className="form-label">Amount</label>
          <input className="" value="0" />
        </div>

        <div className="col-md-3">
          <label className="form-label">HO Reference</label>
          <input className="" value="Draft" />
        </div>



      </div>

      <div className=" row col-md-12">
        <div className="col-md-2">
          <label className="form-label">Status</label>
          <input className="" value="created" />
        </div>



        <div className="col-md-3">
          <label
            className="form-label"
          >
            Description
          </label>
          <textarea
            className="form-control"
            rows="2"
            id=""
            style={{ height: "70px", resize: "none" }}
          ></textarea>
        </div>


        <div className="col-md-1 ">
          <button className="button-style group-button" style={{ width: '90px' }}>Save</button>
        </div>

        <div className="col-md-2">
          <button className="button-style group-button"
           style={{ width: '90px', marginLeft:'70px' }}>Delete</button>
        </div>

        <div className=" col-md-1 ">
              <button className="button-style group-button" style={{ width: '90px', marginLeft:'20px' }}>Post</button>
            </div>
            <div className=" col-md-1 ">
              <button className="button-style group-button"
               style={{ width: '90px', marginLeft:'70px' }}>Print</button>
            </div>
      </div>








      <div className="row col-md-12">
        <div className="col-md-6 mt-2 mb-3">
          <div className="row col-md-12 mt-2">
            <div className="col-md-6 mt-2">
              <label className="form-label">Against Invoices</label>
            </div>

            <div className="col-md-6">
              <button className="button-style mt-1 mb-2 group-button ms-5">
                Remove Invoice
              </button>
            </div>
          </div>

          <div
            style={{
              height: "250px",
              overflowY: "scroll",
              overflowX: "scroll",
            }}
          >
            <Table className="table-data border">
              <thead
                className="tableHeaderBGColor"
                style={{ textAlign: "center" }}
              >
                <tr style={{ whiteSpace: "nowrap" }}>
                  <th style={{ whiteSpace: "nowrap" }}>Srl no</th>
                  <th>Amount</th>
                  <th>Invoice No</th>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Account</th>
                  <th>Received</th>
                  <th>Receive Now</th>
                  <th>Id</th>
                  <th>Unitname</th>
                  <th>PVSrlID</th>
                  <th>Unit_UId</th>
                  <th>HOPrvId</th>
                  <th>RecdPvSrl</th>
                  <th>HO_Uid</th>
                  <th>Dc_inv_no</th>
                  <th>Inv_No</th>
                  <th>Inv_Type</th>
                  <th>Inv_Amount</th>
                  <th>Amt_received</th>
                  <th>Receive_Now</th>
                  <th>InvUpdated</th>
                  <th>Inv_date</th>
                  <th>Updated</th>
                  <th>RefNo</th>
                  <th>UnitId</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                <tr style={{ whiteSpace: "nowrap" }} className="">
                  {/* <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td> 
                  <td></td>
                  <td></td> */}
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
        <div className="col-md-6 mt-2">
          <div className="row col-md-12 mb-2">
            <label
              className="form-label col-md-3"
              style={{ whiteSpace: "nowrap", marginTop: "10px" }}
            >
              Select Invoices
            </label>

            <div className="col-md-3 mt-3">
              <select className="ip-select">
                <option value="option 1">MAGOD LASER</option>
                <option value="option 2"></option>
                <option value="option 3"></option>
              </select>
            </div>

            <div className=" col-md-4 ms-5 mb-1">
              <button className="button-style group-button ">
                Add Invoice
              </button>
            </div>
          </div>

          <div
            style={{
              height: "250px",
              overflowY: "scroll",
              overflowX: "scroll",
            }}
          >
            <Table className="table-data border">
              <thead
                className="tableHeaderBGColor"
                style={{ textAlign: "center" }}
              >
                <tr style={{ whiteSpace: "nowrap" }}>
                  <th>Select</th>
                  <th>Type</th>
                  <th>Invoice No</th>
                  <th>Rate</th>
                  <th>Grand Total</th>
                  <th>Amount Received</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                <tr style={{ whiteSpace: "nowrap" }} className="">
                  {/* <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td> */}
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}


