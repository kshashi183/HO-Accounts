import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { Table } from "react-bootstrap";
import { Typeahead } from "react-bootstrap-typeahead";
import { useLocation, useNavigate } from "react-router-dom";
import { baseURL } from "../../../../../api/baseUrl";

export default function CreateNewForm() {
  const navigate = useNavigate();

  const location = useLocation();
  const rowData = location.state ? location.state : "";
  console.log("rowdata", rowData);
  const [getUnit, setGetUnit] = useState("");
  const [getCustomer, setGetCustomer] = useState("");
  const [getCustCode, setGetCustCode] = useState("");
  // const [getInputCustName, setGetInputCustName] = useState("");
  const [selectedTxntType, setSelectedTxntType] = useState("");
  const [getUnitNames, setGetUnitNames] = useState([]);
  const [getCustNames, setGetCustNames] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);
  const [selectedCustOption, setSelectedCustOption] = useState([]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const [rvData, setRvData] = useState({
    apiData: null,
    flag: false,
    date: new Date(),
    insertId: "",
    firstTableArray: [],
    secondTableArray: [],
    custData: [],
    postData: {
      RecdPVID: "",
      Recd_PVNo: "Draft",
      Recd_PV_Date: new Date().toLocaleDateString("en-GB").split("/").join("-"),
      //  Recd_PV_Date: formatDate(new Date()),

      ReceiptStatus: "Draft",
      CustName: "",
      Cust_code: "",
      TxnType: "",
      Amount: "",
      On_account: "",
      Description: "",
      selectedCustomer: "",
      RecdPvSrl: 0,
      PVSrlID: "",
      InvUpdated: 0,
      Sync_Hold: 0,
    },
    data: {
      inv_data: [],
      receipt_details: [],
      receipt_id: "",
      receipt_data: null,
    },
    open: false,
  });

  const initial = {
    RecdPVID: "",
    Recd_PVNo: "Draft",
    Recd_PV_Date: new Date().toLocaleDateString("en-GB").split("/").join("-"),
    // Recd_PV_Date: formatDate(new Date()),
    ReceiptStatus: "Draft",
    CustName: "",
    Cust_code: "",
    TxnType: "",
    Amount: "",
    On_account: "",
    Description: "",
    selectedCustomer: "",
  };



  // const [postData, setPostData] = useState(initial);



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


  const getReceipts = async (cust_code, postdata) => {
    setRvData((prevRvData) => ({ ...prevRvData, postData: postdata }));

    try {
      const resp = await axios.get(
        baseURL + `/createnew/getleftTable?receipt_id=${rowData}`
      );

      try {
        const response = await axios.get(
          baseURL + `/createnew/ho_openInvoices?customercode=${cust_code}`
        );

        setRvData((prevRvData) => ({
          ...prevRvData,
          data: {
            ...prevRvData.data,
            inv_data: response.data.Result,
            receipt_details: resp.data.Result,

            receipt_id: rowData,
          },
        }));

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  useEffect(() => {
    const fetchData = async () => {
      if (rowData !== "") {
        try {
          const response = await axios.get(
            baseURL + `/createnew/getFormData?receipt_id=${rowData}`
          );
          console.log("cudtt", response.data.Result[0]);
          getReceipts(
            response.data.Result[0].Cust_code,
            response.data.Result[0]
          );
        } catch (error) {
          console.error("Error making API call:", error);
        }
      }
    };

    fetchData();
  }, [rowData]);




  function formatAmount(amount) {
    // Assuming amount is a number
    const formattedAmount = new Intl.NumberFormat('en-IN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);

    return formattedAmount;
  }

  const PaymentReceipts = useCallback((e) => {

    const { name, value } = e.target;

    setRvData((prevRvData) => ({
      ...prevRvData,
      postData: {
        ...prevRvData.postData,
        [name]: value,
        // On_account: name === "Amount" ? value : prevRvData.postData.On_account,
      },
    }));
  }, []);
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
          <button style={{ width: '90px' }}
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
          <input class="" name="HORef" placeholder="" disabled
            value={rvData.postData.HORef} />
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
            onChange={PaymentReceipts}
            value={rvData.postData.TxnType}
          >
            <option value="">Select</option>
            <option value="Bank">Bank</option>
            <option value="Cash">Cash</option>
            <option value="Adjustment">Adjustment</option>
            <option value="Rejection">Rejection</option>
            <option value="TDS Receivable">TDS Receivable</option>
            <option value="Rate Difference">Rate Difference</option>
            <option value="Short Supply">Short Supply</option>
            <option value="Balance Recoverable">Balance Recoverable</option>
            <option value="Other Income">Other Income</option>
            <option value="Balance Not Recoverable">
              Balance Not Recoverable
            </option>
            <option value="QR Code and RTGS">QR Code and RTGS</option>
          </select>
        </div>

        <div className="col-md-3 ">
          <label className="form-label">Receive Form</label>
          <input className="" value={getCustomer} />
        </div>

        <div className="col-md-3">
          <label className="form-label">Amount</label>
          <input name='Amount'
            onChange={PaymentReceipts}
            disabled={
              rvData && rvData.postData.Status !== "Draft"
                ? rvData.postData.ReceiptStatus
                : "" || rvData.data.receipt_details.length !== 0
            }
            value={rvData.postData.Amount} />
        </div>

        <div className="col-md-3">
          <label className="form-label">HO Reference</label>
          <input name='HORef'
            onChange={PaymentReceipts}
            value={rvData.postData.HORef} />
        </div>



      </div>

      <div className=" row col-md-12">
        <div className="col-md-2">
          <label className="form-label">Status</label>
          <input name="Status"
            onChange={PaymentReceipts}
            disabled={
              rvData && rvData.postData.Status !== "Draft"
                ? rvData.postData.ReceiptStatus
                : "" || rvData.data.receipt_details.length !== 0
            }
            value={rvData.postData.Status} />
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
            id="" name='Description'
            onChange={PaymentReceipts}
            value={rvData.postData.Description}
            disabled={
              rvData && rvData.postData.Status !== "Draft"
                ? rvData.postData.ReceiptStatus
                : "" || rvData.data.receipt_details.length !== 0
            }
            style={{ height: "70px", resize: "none" }}
          ></textarea>
        </div>

        <div className="col-md-7 row">

          {rvData.postData.ReceiptStatus === "Draft" && (

            <>
              <div className="col-md-2">
                <button className="button-style group-button" style={{ width: '90px' }}>Save</button>
              </div>

              <div className="col-md-2">
                <button className="button-style group-button"
                  style={{ width: '90px' }}>Delete</button>
              </div>

              <div className=" col-md-2 ">
                <button className="button-style group-button" style={{ width: '90px', }}>Post</button>
              </div>
            </>
          )}

          <div className=" col-md-2 ">
            <button className="button-style group-button"
              style={{ width: '90px', }}>Print</button>
          </div>

          <div className=" col-md-3 ">
            <button className="button-style group-button"
              style={{ width: '90px', }}>Cancel</button>
          </div>
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
                {rvData.data.receipt_details
                  ? rvData.data.receipt_details.map((data, index) => (
                    <>
                      <tr
                        style={{ whiteSpace: "nowrap" }}
                        onClick={() => handleRowSelect(data)}
                        key={data.PVSrlID}
                        className={
                          rvData.firstTableArray.some(
                            (row) => row.Dc_inv_no === data.Dc_inv_no
                          )
                            ? "selectedRow"
                            : ""
                        }
                      >
                        {/* <td>{data.RecdPvSrl}</td> */}
                        <td>{index + 1}</td>

                        <td>{data.Inv_No}</td>

                        <td>
                          {new Date(data.Inv_date)
                            .toLocaleDateString("en-GB")
                            .replace(/\//g, "-")}
                        </td>

                        <td>{data.Inv_Type}</td>
                        <td>{formatAmount(data.Inv_Amount)}</td>
                        <td>{formatAmount(data.Amt_received)}</td>
                        <td>
                          <input
                            //type="number"
                            // onBlur={onBlurr}
                            name="Receive_Now"
                            value={(data.Receive_Now)}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                data.Inv_No,
                                data.Receive_Now
                              )
                            }
                            disabled={rvData && rvData.postData.ReceiptStatus !== "Draft"
                              ? rvData.postData.ReceiptStatus
                              : ""}

                            onKeyPress={(e) => {
                              // Allow only numbers (0-9) and backspace
                              const isNumber = /^[0-9\b]+$/;
                              if (!isNumber.test(e.key)) {
                                e.preventDefault();
                              }
                            }}
                          />
                        </td>
                        <td>{data.RefNo}</td>
                        <td>
                          <input
                            type="checkbox"
                            checked={
                              rvData.postData.InvUpdated === 1
                                ? rvData.postData.InvUpdated
                                : ""
                            }
                          // onChange={(e) => handlesaveChange(rv.Inv_No)}
                          />
                        </td>
                      </tr>
                    </>
                  ))
                  : ""}
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
                  <th>Date</th>
                  <th>Grand Total</th>
                  <th>Amount Received</th>
                </tr>
              </thead>

              <tbody className="tablebody">
                {rvData.data.inv_data?.map((row, index) => (
                  <tr key={index}
                    style={{ backgroundColor: row.isSelected ? '#3498db' : 'inherit', whiteSpace: "nowrap" }}
                  // onDoubleClick={addToVoucher}

                  // onDoubleClick={() => {

                  //   setDoubleClickSignal(true);


                  //   handleCheckboxChange({ target: { checked: !row.isSelected } }, row);
                  // }}

                  >

                    <td>
                      <input
                        type="checkbox"
                        className="mt-1"
                        id={`checkbox_${index}`}
                        checked={row.isSelected}
                      //   onChange={(e) => handleCheckboxChange(e, row)}
                      />
                    </td>
                    <td>{row.DC_InvType}</td>
                    <td>{row.Inv_No}</td>
                    <td>
                      {new Date(row.Inv_Date)
                        .toLocaleDateString("en-GB")
                        .replace(/\//g, "-")}
                    </td>
                    <td>{row.GrandTotal}</td>
                    <td>{row.PymtAmtRecd}</td>
                    <td>{row.Balance}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
}


